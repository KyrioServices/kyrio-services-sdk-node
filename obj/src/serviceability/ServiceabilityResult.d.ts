import { LocationType } from './LocationType';
import { SiteStatus } from './SiteStatus';
/**
 * Response from cable provider with service status for requested location.
 */
export declare class ServiceabilityResult {
    /**
     * This field will be present if the provider has assigned a unique location identifier (aka housekey) for the address.
     */
    locationId: string;
    /**
     * This field will contain the value ‘residential’ or ‘business’ if the provider characterizes the location.
     * Otherwise a value of ‘unknown’ will be returned.
     */
    locationType: LocationType;
    /**
     * A 4-digit identifier will be returned for each provider.
     */
    providerId: string;
    /**
     * Company name associated with the provider id.
     */
    provider: string;
    /**
     * Service status for the location (site).
     */
    siteStatus: SiteStatus;
}
