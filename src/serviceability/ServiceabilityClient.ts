import { KyrioAccount } from '../KyrioAccount';
import { KyrioError } from '../KyrioError';
import { ErrorCode } from '../ErrorCode';

import { KyrioRestClient } from '../shared/KyrioRestClient';
import { Address } from '../shared/Address';
import { RandomData } from '../shared/RandomData';

import { ServiceabilityResult } from './ServiceabilityResult';
import { LocationType } from './LocationType';
import { SiteStatus } from './SiteStatus';

export class ServiceabilityClient extends KyrioRestClient {
    private static readonly BASE_ROUTE = '/api/v1';

    public constructor(account: KyrioAccount) {
        super(account);
    }

    public determineBusinessServiceability(
        addressLine1: string, addressLine2: string, city: string,
        state: string, postalCode: string, country: string,
        callback: (err: any, results: ServiceabilityResult[]) => void): void {
        let address = <Address>{
            line1: addressLine1,
            line2: addressLine2,
            city: city,
            state: state,
            postalCode: postalCode,
            country: country
        };

        this.determineBusinessServiceabilityForAddress(address, callback);
    }

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
            country: address.country
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

    private mockDetermineBusinessServiceability(address: Address,
        callback: (err: KyrioError, results: ServiceabilityResult[]) => void): void {
        // Simulate random errors
        if (this._account.enableTestError && RandomData.chance(1, 10)) {
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