import { ServiceabilityClient } from "./serviceability/ServiceabilityClient";

/**
 * Account to Kyrio Online Services. It is used to set common connection properties and create clients to access individual services.
 */
export class KyrioAccount {
    private static readonly PROD_SERVER_URL = 'https://api.kyrioconnectionsuite.com';
    private static readonly QA_SERVER_URL = 'https://api.qa.kyrioconnectionsuite.com';

    private static readonly CLIENT_ID_REGEX = /\d{6}/gi
    private static readonly SERVER_URL_REGEX = /(https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?/gi;

    private _clientId: string;
    private _serverUrl: string;
    private _enableTestLocal: boolean = false;
    private _enableTestMock: boolean = false;
    private _enableTestError: boolean = false;
    private _enableQaEnvironment: boolean = false;

    /**
     * Default account constructor
     */
    public constructor() {}

    /**
     * Gets identifier to confirm client who accesses the API.
     * @returns A unique client ID
     */
    public get clientId(): string {
        return this._clientId;
    }

    /**
     * Sets identifier to confirm client who accesses the API.
     * Usually it is set as 6 digit number.
     * @param value A unique client ID
     */
    public set clientId(value: string) {
        if (value == '')
            throw new Error('clientId cannot be empty');
        if (value.length != 6)
            throw new Error('clientId must be 6 characters long');

        this._clientId = value;
    }

    /**
     * Gets base url to connect to Kyrio servers.
     * @returns A server URL to connect to
     */
    public get serverUrl(): string {
        if (this._serverUrl != null)
            return this._serverUrl;
        else if (this._enableQaEnvironment)
            return KyrioAccount.QA_SERVER_URL;
        else
            return KyrioAccount.PROD_SERVER_URL;
    }

    /**
     * Sets base url to connect to Kyrio servers.
     * It is an optional property. It is set automatically based on EnableQaEnvironment.
     * But user is able to override it.
     * @param value A server URL to connect to
     */
    public set serverUrl(value: string) {
        if (value == '')
            throw new Error('serverUrl cannot be empty');
        if (!KyrioAccount.SERVER_URL_REGEX.test(value))
            throw new Error('serverUrl must be set as https://<host>[:<port>]');

        this._serverUrl = value;
    }

    /**
     * Checks if enabled local test calls to return random responses.
     * @returns <code>true</code> if local test calls are enabled or <code>false</code> otherwise
     */
    public get enableTestLocal(): boolean {
        return this._enableTestLocal;
    }

    /**
     * Enables local test calls and returns random responses.
     * This allows to avoid roundtrips to Kyrio servers and incurring changes for API use.
     * The responses are delayed for 1.5 sec to make them more realistic.
     * This property works together with EnableTestError.
     * @param value <code>true</code> if local test calls are enabled or <code>false</code> otherwise
     */
    public set enableTestLocal(value: boolean) {
        this._enableTestLocal = value;
    }

    /**
     * Checks if enabled remote test calls to return random responses.
     * @returns <code>true</code> if remote test calls are enabled or <code>false</code> otherwise
     */
    public get enableTestMock(): boolean {
        return this._enableTestMock;
    }

    /**
     * Enables remote test calls and returns random responses.
     * With this property enabled client makes calls to Kyrio servers without changes for API use.
     * This property works together with EnableTestError.
     * @param value <code>true</code> if remote test calls are enabled or <code>false</code> otherwise
     */
    public set enableTestMock(value: boolean) {
        this._enableTestMock = value;
    }

    /**
     * Checks if enabled random errors while making test calls.
     * @returns <code>true</code> if random test errors are enabled or <code>false</code> otherwise
     */
    public get enableTestError(): boolean {
        return this._enableTestError;
    }

    /**
     * Enables random errors while making test calls.
     * The errors simulate Internal (500) or Timeout (504) responses with 1% probability.
     * This property works together with EnableTestLock and EnableTestMock.
     * @param value <code>true</code> if random test errors are enabled or <code>false</code> otherwise
     */
    public set enableTestError(value: boolean) {
        this._enableTestError = value;
    }

    /**
     * Checks if enabled calls to QA environment.
     * @returns <code>true</code> to connect to QA servers or <code>false</code> to connect to Production servers
     */
    public get enableQaEnvironment(): boolean {
        return this._enableQaEnvironment;
    }

    /**
     * Enables calls to QA environment and sets default ServerUrl to QA servers.
     * In the future this property can be deprecated.
     * @param value <code>true</code> to connect to QA servers or <code>false</code> to connect to Production servers
     */
    public set enableQaEnvironment(value: boolean) {
        this._enableQaEnvironment= value;
    }
    
    /**
     * Creates client to access Kyrio Serviceability API.
     * @returns Client to access Kyrio Serviceability API.
     */
    public createServiceabilityClient(): ServiceabilityClient {
        return new ServiceabilityClient(this);
    }
}