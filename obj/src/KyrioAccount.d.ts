import { ServiceabilityClient } from "./serviceability/ServiceabilityClient";
/**
 * Account to Kyrio Online Services. It is used to set common connection properties and create clients to access individual services.
 */
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
    /**
     * Default account constructor
     */
    constructor();
    /**
     * Gets identifier to confirm client who accesses the API.
     * @returns A unique client ID
     */
    /**
     * Sets identifier to confirm client who accesses the API.
     * Usually it is set as 6 digit number.
     * @param value A unique client ID
     */
    clientId: string;
    /**
     * Gets base url to connect to Kyrio servers.
     * @returns A server URL to connect to
     */
    /**
     * Sets base url to connect to Kyrio servers.
     * It is an optional property. It is set automatically based on EnableQaEnvironment.
     * But user is able to override it.
     * @param value A server URL to connect to
     */
    serverUrl: string;
    /**
     * Checks if enabled local test calls to return random responses.
     * @returns <code>true</code> if local test calls are enabled or <code>false</code> otherwise
     */
    /**
     * Enables local test calls and returns random responses.
     * This allows to avoid roundtrips to Kyrio servers and incurring changes for API use.
     * The responses are delayed for 1.5 sec to make them more realistic.
     * This property works together with EnableTestError.
     * @param value <code>true</code> if local test calls are enabled or <code>false</code> otherwise
     */
    enableTestLocal: boolean;
    /**
     * Checks if enabled remote test calls to return random responses.
     * @returns <code>true</code> if remote test calls are enabled or <code>false</code> otherwise
     */
    /**
     * Enables remote test calls and returns random responses.
     * With this property enabled client makes calls to Kyrio servers without changes for API use.
     * This property works together with EnableTestError.
     * @param value <code>true</code> if remote test calls are enabled or <code>false</code> otherwise
     */
    enableTestMock: boolean;
    /**
     * Checks if enabled random errors while making test calls.
     * @returns <code>true</code> if random test errors are enabled or <code>false</code> otherwise
     */
    /**
     * Enables random errors while making test calls.
     * The errors simulate Internal (500) or Timeout (504) responses with 1% probability.
     * This property works together with EnableTestLock and EnableTestMock.
     * @param value <code>true</code> if random test errors are enabled or <code>false</code> otherwise
     */
    enableTestError: boolean;
    /**
     * Checks if enabled calls to QA environment.
     * @returns <code>true</code> to connect to QA servers or <code>false</code> to connect to Production servers
     */
    /**
     * Enables calls to QA environment and sets default ServerUrl to QA servers.
     * In the future this property can be deprecated.
     * @param value <code>true</code> to connect to QA servers or <code>false</code> to connect to Production servers
     */
    enableQaEnvironment: boolean;
    /**
     * Creates client to access Kyrio Serviceability API.
     * @returns Client to access Kyrio Serviceability API.
     */
    createServiceabilityClient(): ServiceabilityClient;
}
