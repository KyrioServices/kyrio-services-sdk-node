/**
 * Location postal address.
 */
export class Address {
    /**
     * Street number, pre-directional, street name, suffix, post-directional
     * Examples:
     * 123 N Main St
     * 234 Michigan Ave SW
     */
    public line1: string;

    /**
     * Secondary address line such as Apt, Suite or Lot
     */
    public line2: string;

    /**
     * City or town name
     */
    public city: string;

    /**
     * For US addresses, usethe standard 2-character state abbreviation
     */
    public state: string;

    /**
     * For US addresses, use the 5-digit ZIP code
     */
    public postalCode: string;

    /**
     * Use ‘US’ to indicate US addresses.  If the argument is omitted, ‘US’ will be assumed.
     * Refer to ISO 3166 Country Code Standardfor non-US addresses.
     */
    public countryCode: string;
}