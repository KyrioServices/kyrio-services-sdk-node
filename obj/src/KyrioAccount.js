"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceabilityClient_1 = require("./serviceability/ServiceabilityClient");
var KyrioAccount = /** @class */ (function () {
    function KyrioAccount() {
        this._serverUrl = 'http://localhost:7277';
        this._enableTestLocal = false;
        this._enableTestMock = false;
        this._enableTestError = false;
        this._enableQaEnvironment = false;
    }
    Object.defineProperty(KyrioAccount.prototype, "clientId", {
        get: function () {
            return this._clientId;
        },
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
        get: function () {
            if (this._serverUrl != null)
                return this._serverUrl;
            else if (this._enableQaEnvironment)
                return KyrioAccount.QA_SERVER_URL;
            else
                return KyrioAccount.PROD_SERVER_URL;
        },
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
        get: function () {
            return this._enableTestLocal;
        },
        set: function (value) {
            this._enableTestLocal = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KyrioAccount.prototype, "enableTestMock", {
        get: function () {
            return this._enableTestMock;
        },
        set: function (value) {
            this._enableTestMock = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KyrioAccount.prototype, "enableTestError", {
        get: function () {
            return this._enableTestError;
        },
        set: function (value) {
            this._enableTestError = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KyrioAccount.prototype, "enableQaEnvironment", {
        get: function () {
            return this._enableQaEnvironment;
        },
        set: function (value) {
            this._enableQaEnvironment = value;
        },
        enumerable: true,
        configurable: true
    });
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