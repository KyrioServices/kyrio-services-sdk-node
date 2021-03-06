/**
 * Determines service status of a site (location).
 */
export enum SiteStatus {
    /**
     * The provider did not provide a site status
     */
    None = "none",

    /**
     * Indicates that one or more cable services are currently available at the address
     */
    OnNet = "on_net",

    /**
     * Indicates the MSO has previously surveyed the site and determined it cannot be served
     */
    OffNet = "off_net",

    /**
     * Indicates the address is near existing cable infrastructure and can likely be served at a reasonable cost/effort
     */
    NearNet = "near_net",

    /**
     * Indicates the MSO must conduct additional analysis to determine if the site can be served
     */
    SurveyRequired = "survey_req",

    /**
     * Indicates that the MSO serves the general area such as the 5-digit ZIP code. 
     * The MSO should be contacted for additional information about the serviceability
     * of a location identified as ‘proximity’.
     */
    Proximity = "proximity"
}