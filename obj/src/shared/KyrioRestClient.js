"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = require('url');
var querystring = require('querystring');
var ErrorCode_1 = require("../ErrorCode");
/**
 * Abstract implementation of REST clients to call Kyrio services.
 */
var KyrioRestClient = /** @class */ (function () {
    /**
     * Constructs this client and sets initial values.
     * @param account A Kyrio account associated with his client.
     */
    function KyrioRestClient(account) {
        if (account == null)
            throw new Error("account cannot be null");
        this._account = account;
    }
    /**
     * Creates HTTP client and sets default headers for all REST calls.
     * @return Created HTTP client
     */
    KyrioRestClient.prototype.createClient = function () {
        var client;
        if (this._account.serverUrl.indexOf('http://') == 0)
            return require('http');
        else if (this._account.serverUrl.indexOf('https://') == 0)
            return require('https');
        var pos = this._account.serverUrl.indexOf('://');
        var protocol = pos > 0 ? this._account.serverUrl.substring(0, pos) : this._account.serverUrl;
        throw new Error('Unsupported protocol ' + protocol);
    };
    /**
     * Composes query parameters into encoded string.
     * @param params Operation query parameters
     * @return Encoded query parameter string
     */
    KyrioRestClient.prototype.composeQueryParams = function (params) {
        if (params == null)
            return '';
        return '?' + querystring.stringify(params);
    };
    /**
     * Invokes REST operation on the server and handles the response.
     * @param method Operation method: GET, POST, PUT or DELETE
     * @param route Operation base route.
     * @param parameters Operation query parameter.
     * @param body Value to be sent in request body.
     * @return Value returned by the server of expected type.
     */
    KyrioRestClient.prototype.invoke = function (method, route, params, body, callback) {
        if (this._account.clientId == '')
            throw new Error('clientId is not set');
        if (this._account.serverUrl == '')
            throw new Error('serverUrl is not set');
        if (route == '')
            throw new Error('route cannot be null');
        var client = this.createClient();
        var requestUri = url.parse(this._account.serverUrl);
        var requestContent = body != null ? JSON.stringify(body) : '';
        var options = {
            method: method,
            protocol: requestUri.protocol,
            hostname: requestUri.hostname,
            rejectUnauthorized: false,
            port: requestUri.port,
            path: route + this.composeQueryParams(params),
            headers: {
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(requestContent),
                'accept': 'application/json',
                'client-id': this._account.clientId,
                'enable-test-mock': this._account.enableTestMock,
                'enable-test-error': this._account.enableTestError
            },
            timeout: 20000
        };
        var request = client.request(options, function (response) {
            var responseContent = '';
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                responseContent += chunk;
            });
            response.on('end', function () {
                var err = null;
                var responseObject = null;
                // Parse response object
                try {
                    responseObject = JSON.parse(responseContent);
                }
                catch (e) {
                    err = {
                        status: response.statusCode,
                        code: ErrorCode_1.ErrorCode.UNKNOWN,
                        message: '' + e
                    };
                }
                // Define errors
                if (response.statusCode == 400)
                    err = { code: ErrorCode_1.ErrorCode.BAD_REQUEST, status: response.statusCode, message: '' + responseObject };
                else if (response.statusCode == 401)
                    err = { code: ErrorCode_1.ErrorCode.UNAUTHORIZED, status: response.statusCode, message: '' + responseObject };
                else if (response.statusCode == 500) {
                    if (responseObject == 'Unknown error')
                        err = { code: ErrorCode_1.ErrorCode.UNKNOWN, status: response.statusCode, message: '' + responseObject };
                    else
                        err = { code: ErrorCode_1.ErrorCode.INTERNAL, status: response.statusCode, message: '' + responseObject };
                }
                else if (response.statusCode == 504)
                    err = { code: ErrorCode_1.ErrorCode.TIMEOUT, status: response.statusCode, message: '' + responseObject };
                else if (response.statusCode >= 400)
                    err = { code: ErrorCode_1.ErrorCode.UNKNOWN, status: response.statusCode, message: responseContent };
                else if (response.statusCode == 204)
                    responseObject = null;
                var result = err == null ? responseObject : null;
                callback(err, result);
            });
        });
        request.on('error', function (err) {
            err = {
                status: null,
                code: ErrorCode_1.ErrorCode.NO_CONNECTION,
                message: '' + err
            };
            callback(err, null);
        });
        if (requestContent != '')
            request.write(requestContent, 'utf8');
        request.end();
    };
    return KyrioRestClient;
}());
exports.KyrioRestClient = KyrioRestClient;
//# sourceMappingURL=KyrioRestClient.js.map