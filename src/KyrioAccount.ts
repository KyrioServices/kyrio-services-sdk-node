import { ServiceabilityClient } from "./serviceability/ServiceabilityClient";

export class KyrioAccount {
    private static readonly PROD_SERVER_URL = 'https://api.kyrioconnectionsuite.com';
    private static readonly QA_SERVER_URL = 'https://api.qa.kyrioconnectionsuite.com';

    private static readonly CLIENT_ID_REGEX = /\d{6}/gi
    private static readonly SERVER_URL_REGEX = /(https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?/gi;

    private _clientId: string;
    private _serverUrl: string = 'http://localhost:7277';
    private _enableTestLocal: boolean = false;
    private _enableTestMock: boolean = false;
    private _enableTestError: boolean = false;
    private _enableQaEnvironment: boolean = false;

    public constructor() {}

    public get clientId(): string {
        return this._clientId;
    }

    public set clientId(value: string) {
        if (value == '')
            throw new Error('clientId cannot be empty');
        if (value.length != 6)
            throw new Error('clientId must be 6 characters long');

        this._clientId = value;
    }

    public get serverUrl(): string {
        if (this._serverUrl != null)
            return this._serverUrl;
        else if (this._enableQaEnvironment)
            return KyrioAccount.QA_SERVER_URL;
        else
            return KyrioAccount.PROD_SERVER_URL;
    }

    public set serverUrl(value: string) {
        if (value == '')
            throw new Error('serverUrl cannot be empty');
        if (!KyrioAccount.SERVER_URL_REGEX.test(value))
            throw new Error('serverUrl must be set as https://<host>[:<port>]');

        this._serverUrl = value;
    }

    public get enableTestLocal(): boolean {
        return this._enableTestLocal;
    }

    public set enableTestLocal(value: boolean) {
        this._enableTestLocal = value;
    }

    public get enableTestMock(): boolean {
        return this._enableTestMock;
    }

    public set enableTestMock(value: boolean) {
        this._enableTestMock = value;
    }

    public get enableTestError(): boolean {
        return this._enableTestError;
    }

    public set enableTestError(value: boolean) {
        this._enableTestError = value;
    }

    public get enableQaEnvironment(): boolean {
        return this._enableQaEnvironment;
    }

    public set enableQaEnvironment(value: boolean) {
        this._enableQaEnvironment= value;
    }
    
    public createServiceabilityClient(): ServiceabilityClient {
        return new ServiceabilityClient(this);
    }
}