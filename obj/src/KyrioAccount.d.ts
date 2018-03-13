import { ServiceabilityClient } from "./serviceability/ServiceabilityClient";
export declare class KyrioAccount {
    private static readonly PROD_SERVER_URL;
    private static readonly QA_SERVER_URL;
    private static readonly CLIENT_ID_REGEX;
    private static readonly SERVER_URL_REGEX;
    private _clientId;
    private _serverUrl;
    private _enableTestLocal;
    private _enableTestMock;
    private _enableTestError;
    private _enableQaEnvironment;
    constructor();
    clientId: string;
    serverUrl: string;
    enableTestLocal: boolean;
    enableTestMock: boolean;
    enableTestError: boolean;
    enableQaEnvironment: boolean;
    createServiceabilityClient(): ServiceabilityClient;
}
