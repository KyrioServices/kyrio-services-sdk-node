import { KyrioAccount } from '../KyrioAccount';
import { KyrioError } from '../KyrioError';
import { ErrorCode } from '../ErrorCode';

import { KyrioRestClient } from '../shared/KyrioRestClient';
import { Address } from '../shared/Address';
import { RandomData } from '../shared/RandomData';

import { ServiceabilityResult } from './ServiceabilityResult';
import { LocationType } from './LocationType';
import { SiteStatus } from './SiteStatus';

/**
 * Client to access Kyrio Serviceability API
 */
export class ServiceabilityClient extends KyrioRestClient {
    private static readonly BASE_ROUTE = '/business/api/v1';

    /**
     * Default client constractor.
     * @param account a Kyrio account associated with this client.
     */
    public constructor(account: KyrioAccount) {
        super(account);
    }

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
    public determineBusinessServiceability(
        addressLine1: string, addressLine2: string, city: string,
        state: string, postalCode: string, countryCode: string,
        callback: (err: any, results: ServiceabilityResult[]) => void): void {
        let address = <Address>{
            line1: addressLine1,
            line2: addressLine2,
            city: city,
            state: state,
            postalCode: postalCode,
            countryCode: countryCode
        };

        this.determineBusinessServiceabilityForAddress(address, callback);
    }

    /**
     * Determines cable providers that serve location specified by it's postal address.
     * @param address Location postal address.
     * @return Array of serviceability results from cable providers.
     * @throws KyrioException returned by the server.
     */
    public determineBusinessServiceabilityForAddress(
        address: Address,
        callback: (err: KyrioError, results: ServiceabilityResult[]) => void): void {
        if (address == null)
            throw new Error('address cannot be null');
        if (callback == null)
            throw new Error('callback must be a function');

        // For local testing return mock without calling server
        if (this._account.enableTestLocal) {
            this.mockDetermineBusinessServiceability(address,  callback);
            return;
        }

        // Prepare invocation parameters
        let route = ServiceabilityClient.BASE_ROUTE + '/serviceability';
        let params = {
            address_line1: address.line1,
            address_line2: address.line2,
            city: address.city,
            state: address.state,
            postal_code: address.postalCode,
            country_code: address.countryCode
        };

        // Invoke operation on the server
        super.invoke('GET', route, params, null, (err, response) => {
            // Return invocation error
            if (err != null) {
                callback(err, null);
                return;
            }

            // Convert and return results
            response = response || [];
            let results: ServiceabilityResult[] = [];
            for (let value of response) {
                let result = <ServiceabilityResult>{
                    locationId: value.location_id,
                    locationType: value.location_type,
                    providerId: value.provider_id,
                    provider: value.provider,
                    siteStatus: value.site_status
                };
                results.push(result);
            }

            callback(null, results);
        });
    }

    /**
     * Generates random test serviceability response.
     * @param address Location postal address.
     * @return Array of serviceability results from cable providers.
     * @throws KyrioException returned by the server.
     */
    private mockDetermineBusinessServiceability(address: Address,
        callback: (err: KyrioError, results: ServiceabilityResult[]) => void): void {
        // Simulate random errors
        if (this._account.enableTestError && RandomData.chance(1, 100)) {
            let err = RandomData.nextError();
            callback(err, null);
            return;
        }

        let resultCount = RandomData.nextInteger(0, 2);
        let results: ServiceabilityResult[] = [];
        for (let index = 0; index < resultCount; index++)
        {
            let provider = RandomData.nextProvider();
            let result = <ServiceabilityResult>{
                locationId: RandomData.nextInteger(99999).toString(),
                locationType: RandomData.pick([
                    LocationType.Unknown, LocationType.Residential, LocationType.Business
                ]),
                providerId: provider.id,
                provider: provider.name,
                siteStatus: RandomData.pick([
                    SiteStatus.OnNet, SiteStatus.OffNet, SiteStatus.NearNet,
                    SiteStatus.SurveyRequired, SiteStatus.Proximity
                ])
            };
            results.push(result);
        }    

        setTimeout(() => {
            callback(null, results);
        }, 1500);
    }

}