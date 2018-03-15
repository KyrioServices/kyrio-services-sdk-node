"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceabilityClient_1 = require("./serviceability/ServiceabilityClient");
/**
 * Account to Kyrio Online Services. It is used to set common connection properties and create clients to access individual services.
 */
var KyrioAccount = /** @class */ (function () {
    /**
     * Default account constructor
     */
    function KyrioAccount() {
        this._serverUrl = 'http://localhost:7277';
        this._enableTestLocal = false;
        this._enableTestMock = false;
        this._enableTestError = false;
        this._enableQaEnvironment = false;
    }
    Object.defineProperty(KyrioAccount.prototype, "clientId", {
        /**
         * Gets identifier to confirm client who accesses the API.
         * @returns A unique client ID
         */
        get: function () {
            return this._clientId;
        },
        /**
         * Sets identifier to confirm client who accesses the API.
         * Usually it is set as 6 digit number.
         * @param value A unique client ID
         */
        set: function (value) {
            if (value == '')
                throw new Error('clientId cannot be empty');
            if (value.length != 6)
                throw new Error('clientId must be 6 characters long');
            this._clientId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KyrioAccount.prototype, "serverUrl", {
        /**
         * Gets base url to connect to Kyrio servers.
         * @returns A server URL to connect to
         */
        get: function () {
            if (this._serverUrl != null)
                return this._serverUrl;
            else if (this._enableQaEnvironment)
                return KyrioAccount.QA_SERVER_URL;
            else
                return KyrioAccount.PROD_SERVER_URL;
        },
        /**
         * Sets base url to connect to Kyrio servers.
         * It is an optional property. It is set automatically based on EnableQaEnvironment.
         * But user is able to override it.
         * @param value A server URL to connect to
         */
        set: function (value) {
            if (value == '')
                throw new Error('serverUrl cannot be empty');
            if (!KyrioAccount.SERVER_URL_REGEX.test(value))
                throw new Error('serverUrl must be set as https://<host>[:<port>]');
            this._serverUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KyrioAccount.prototype, "enableTestLocal", {
        /**
         * Checks if enabled local test calls to return random responses.
         * @returns <code>true</code> if local test calls are enabled or <code>false</code> otherwise
         */
        get: function () {
            return this._enableTestLocal;
        },
        /**
         * Enables local test calls and returns random responses.
         * This allows to avoid roundtrips to Kyrio servers and incurring changes for API use.
         * The responses are delayed for 1.5 sec to make them more realistic.
         * This property works together with EnableTestError.
         * @param value <code>true</code> if local test calls are enabled or <code>false</code> otherwise
         */
        set: function (value) {
            this._enableTestLocal = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KyrioAccount.prototype, "enableTestMock", {
        /**
         * Checks if enabled remote test calls to return random responses.
         * @returns <code>true</code> if remote test calls are enabled or <code>false</code> otherwise
         */
        get: function () {
            return this._enableTestMock;
        },
        /**
         * Enables remote test calls and returns random responses.
         * With this property enabled client makes calls to Kyrio servers without changes for API use.
         * This property works together with EnableTestError.
         * @param value <code>true</code> if remote test calls are enabled or <code>false</code> otherwise
         */
        set: function (value) {
            this._enableTestMock = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KyrioAccount.prototype, "enableTestError", {
        /**
         * Checks if enabled random errors while making test calls.
         * @returns <code>true</code> if random test errors are enabled or <code>false</code> otherwise
         */
        get: function () {
            return this._enableTestError;
        },
        /**
         * Enables random errors while making test calls.
         * The errors simulate Internal (500) or Timeout (504) responses with 1% probability.
         * This property works together with EnableTestLock and EnableTestMock.
         * @param value <code>true</code> if random test errors are enabled or <code>false</code> otherwise
         */
        set: function (value) {
            this._enableTestError = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KyrioAccount.prototype, "enableQaEnvironment", {
        /**
         * Checks if enabled calls to QA environment.
         * @returns <code>true</code> to connect to QA servers or <code>false</code> to connect to Production servers
         */
        get: function () {
            return this._enableQaEnvironment;
        },
        /**
         * Enables calls to QA environment and sets default ServerUrl to QA servers.
         * In the future this property can be deprecated.
         * @param value <code>true</code> to connect to QA servers or <code>false</code> to connect to Production servers
         */
        set: function (value) {
            this._enableQaEnvironment = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates client to access Kyrio Serviceability API.
     * @returns Client to access Kyrio Serviceability API.
     */
    KyrioAccount.prototype.createServiceabilityClient = function () {
        return new ServiceabilityClient_1.ServiceabilityClient(this);
    };
    KyrioAccount.PROD_SERVER_URL = 'https://api.kyrioconnectionsuite.com';
    KyrioAccount.QA_SERVER_URL = 'https://api.qa.kyrioconnectionsuite.com';
    KyrioAccount.CLIENT_ID_REGEX = /\d{6}/gi;
    KyrioAccount.SERVER_URL_REGEX = /(https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?/gi;
    return KyrioAccount;
}());
exports.KyrioAccount = KyrioAccount;
//# sourceMappingURL=KyrioAccount.js.map