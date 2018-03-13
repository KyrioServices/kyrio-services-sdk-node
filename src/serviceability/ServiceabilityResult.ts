import { LocationType } from './LocationType';
import { SiteStatus } from './SiteStatus';

export class ServiceabilityResult {
    public locationId: string;
    public locationType: LocationType;
    public providerId: string;
    public provider: string;
    public siteStatus: SiteStatus;
}