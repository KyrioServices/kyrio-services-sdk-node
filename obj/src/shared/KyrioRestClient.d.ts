import { KyrioAccount } from '../KyrioAccount';
import { KyrioError } from '../KyrioError';
/**
 * Abstract implementation of REST clients to call Kyrio services.
 */
export declare abstract class KyrioRestClient {
    /**
     * Kyrio account associated with this client
     */
    protected _account: KyrioAccount;
    /**
     * Constructs this client and sets initial values.
     * @param account A Kyrio account associated with his client.
     */
    constructor(account: KyrioAccount);
    /**
     * Creates HTTP client and sets default headers for all REST calls.
     * @return Created HTTP client
     */
    private createClient();
    /**
     * Composes query parameters into encoded string.
     * @param params Operation query parameters
     * @return Encoded query parameter string
     */
    private composeQueryParams(params);
    /**
     * Invokes REST operation on the server and handles the response.
     * @param method Operation method: GET, POST, PUT or DELETE
     * @param route Operation base route.
     * @param parameters Operation query parameter.
     * @param body Value to be sent in request body.
     * @return Value returned by the server of expected type.
     */
    protected invoke(method: string, route: string, params: any, body: any, callback: (err: KyrioError, response: any) => void): void;
}
