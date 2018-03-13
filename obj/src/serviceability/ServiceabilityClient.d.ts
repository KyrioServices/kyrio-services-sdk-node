import { KyrioAccount } from '../KyrioAccount';
import { KyrioError } from '../KyrioError';
import { KyrioRestClient } from '../shared/KyrioRestClient';
import { Address } from '../shared/Address';
import { ServiceabilityResult } from './ServiceabilityResult';
export declare class ServiceabilityClient extends KyrioRestClient {
    private static readonly BASE_ROUTE;
    constructor(account: KyrioAccount);
    determineBusinessServiceability(addressLine1: string, addressLine2: string, city: string, state: string, postalCode: string, country: string, callback: (err: any, results: ServiceabilityResult[]) => void): void;
    determineBusinessServiceabilityForAddress(address: Address, callback: (err: KyrioError, results: ServiceabilityResult[]) => void): void;
    private mockDetermineBusinessServiceability(address, callback);
}
