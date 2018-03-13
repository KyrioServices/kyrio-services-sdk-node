import { KyrioAccount } from '../KyrioAccount';
import { KyrioError } from '../KyrioError';
export declare class KyrioRestClient {
    protected _account: KyrioAccount;
    constructor(account: KyrioAccount);
    private createClient();
    private composeQueryParams(params);
    protected invoke(method: string, route: string, params: any, body: any, callback: (err: KyrioError, response: any) => void): void;
}
