let url = require('url');
let querystring = require('querystring');

import { KyrioAccount } from '../KyrioAccount';
import { KyrioError } from '../KyrioError';
import { ErrorCode } from '../ErrorCode';

/**
 * Abstract implementation of REST clients to call Kyrio services.
 */
export abstract class KyrioRestClient {
	/**
	 * Kyrio account associated with this client
	 */
    protected _account: KyrioAccount;

	/**
	 * Constructs this client and sets initial values.
	 * @param account A Kyrio account associated with his client.
	 */
    public constructor(account: KyrioAccount) {
        if (account == null)
            throw new Error("account cannot be null");

        this._account = account;
    }

    /**
     * Creates HTTP client and sets default headers for all REST calls.
     * @return Created HTTP client
     */
    private createClient(): any {
        let client: any;
        if (this._account.serverUrl.indexOf('http://') == 0)
            return require('http');
        else if (this._account.serverUrl.indexOf('https://') == 0)
            return require('https');

        let pos = this._account.serverUrl.indexOf('://');
        let protocol = pos > 0 ? this._account.serverUrl.substring(0, pos) : this._account.serverUrl;
        throw new Error('Unsupported protocol ' + protocol);
    }

    /**
     * Composes query parameters into encoded string.
     * @param params Operation query parameters
     * @return Encoded query parameter string
     */
    private composeQueryParams(params: any) {
        if (params == null) return '';
        return '?' + querystring.stringify(params);
    }

    /**
     * Invokes REST operation on the server and handles the response.
     * @param method Operation method: GET, POST, PUT or DELETE
     * @param route Operation base route.
     * @param parameters Operation query parameter.
     * @param body Value to be sent in request body.
     * @return Value returned by the server of expected type.
     */
    protected invoke(method: string, route: string, params: any, body: any,
        callback: (err: KyrioError, response: any) => void): void {
        if (this._account.clientId == '')
            throw new Error('clientId is not set');
        if (this._account.serverUrl == '')
            throw new Error('serverUrl is not set');
        if (route == '')
            throw new Error('route cannot be null');

        let client = this.createClient();
        let responseUri = url.parse(this._account.serverUrl);
        let requestContent = body != null ? JSON.stringify(body) : '';

        let options = {
            method: method,
            hostname: responseUri.hostname,
            port: responseUri.port,
            path: route + this.composeQueryParams(params),
            headers: {
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(requestContent),
                'accept': 'application/json',
                'client-id': this._account.clientId,
                'enable-test-mock': this._account.enableTestMock,
                'enable-test-error': this._account.enableTestError
            }
        };

        let request = client.request(options, (response) => {
            let responseContent = '';

            response.setEncoding('utf8');

            response.on('data', (chunk) => {
                responseContent += chunk;
            });

            response.on('end', () => {
                let err: KyrioError = null;
                let responseObject: any = null;

                // Parse response object
                try {
                    responseObject = JSON.parse(responseContent);
                } catch (e) {
                    err = <KyrioError> {
                        status: response.statusCode,
                        code: ErrorCode.UNKNOWN,
                        message: '' + e
                    }
                }

                // Define errors
                if (response.statusCode == 400)
                    err = <KyrioError>{ code: ErrorCode.BAD_REQUEST, status: response.statusCode, message: '' + responseObject };
                else if (response.statusCode == 401)
                    err = <KyrioError>{ code: ErrorCode.UNAUTHORIZED, status: response.statusCode, message: '' + responseObject };
                else if (response.statusCode == 500) {
                    if (responseObject == 'Unknown error')
                        err = <KyrioError>{ code: ErrorCode.UNKNOWN, status: response.statusCode, message: '' + responseObject };
                    else
                        err = <KyrioError>{ code: ErrorCode.INTERNAL, status: response.statusCode, message: '' + responseObject };
                }
                else if (response.statusCode == 504)
                    err = <KyrioError>{ code: ErrorCode.TIMEOUT, status: response.statusCode, message: '' + responseObject };
                else if (response.statusCode >= 400)
                    err = <KyrioError>{ code: ErrorCode.UNKNOWN, status: response.statusCode, message: responseContent };
                else if (response.statusCode == 204)
                    responseObject = null;                

                var result = err == null ? responseObject : null;
                callback(err, result);
           });

        });

        request.on('error', (err) => {
            err = <KyrioError>{
                status: null,
                code: ErrorCode.NO_CONNECTION,
                message: '' + err
            };
            callback(err, null);
        });

        if (requestContent != '')
            request.write(requestContent, 'utf8');  

        request.end();        
    }
}