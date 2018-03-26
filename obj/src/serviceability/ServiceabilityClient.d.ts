import { KyrioAccount } from '../KyrioAccount';
import { KyrioError } from '../KyrioError';
import { KyrioRestClient } from '../shared/KyrioRestClient';
import { Address } from '../shared/Address';
import { ServiceabilityResult } from './ServiceabilityResult';
/**
 * Client to access Kyrio Serviceability API
 */
export declare class ServiceabilityClient extends KyrioRestClient {
    private static readonly BASE_ROUTE;
    /**
     * Default client constractor.
     * @param account a Kyrio account associated with this client.
     */
    constructor(account: KyrioAccount);
    /**
     * Determines cable providers that serve location specified by it's postal address.
     * The method supports incomplete addresses: addressLine1 and postalCode
     * or addressLine1, city and state.
     * @param addressLine1 Street number, pre-directional, street name, suffix, post-directional.
     * @param addressLine2 Secondary address line such as Apt, Suite or Lot.
     * @param city City or town name.
     * @param state For US addresses, use the standard 2-character state abbreviation.
     * @param postalCode For US addresses, use the 5-digit ZIP code.
     * @param countryCode Use ‘US’ to indicate US addresses.  If the argument is omitted, ‘US’ will be assumed. Refer to ISO 3166 Country Code Standardfor non-US addresses.
     * @return Array of serviceability results from cable providers.
     * @throws KyrioException returned by the server.
     */
    determineBusinessServiceability(addressLine1: string, addressLine2: string, city: string, state: string, postalCode: string, countryCode: string, callback: (err: any, results: ServiceabilityResult[]) => void): void;
    /**
     * Determines cable providers that serve location specified by it's postal address.
     * @param address Location postal address.
     * @return Array of serviceability results from cable providers.
     * @throws KyrioException returned by the server.
     */
    determineBusinessServiceabilityForAddress(address: Address, callback: (err: KyrioError, results: ServiceabilityResult[]) => void): void;
    /**
     * Generates random test serviceability response.
     * @param address Location postal address.
     * @return Array of serviceability results from cable providers.
     * @throws KyrioException returned by the server.
     */
    private mockDetermineBusinessServiceability(address, callback);
}
