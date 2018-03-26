"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var KyrioRestClient_1 = require("../shared/KyrioRestClient");
var RandomData_1 = require("../shared/RandomData");
var LocationType_1 = require("./LocationType");
var SiteStatus_1 = require("./SiteStatus");
/**
 * Client to access Kyrio Serviceability API
 */
var ServiceabilityClient = /** @class */ (function (_super) {
    __extends(ServiceabilityClient, _super);
    /**
     * Default client constractor.
     * @param account a Kyrio account associated with this client.
     */
    function ServiceabilityClient(account) {
        return _super.call(this, account) || this;
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
    ServiceabilityClient.prototype.determineBusinessServiceability = function (addressLine1, addressLine2, city, state, postalCode, countryCode, callback) {
        var address = {
            line1: addressLine1,
            line2: addressLine2,
            city: city,
            state: state,
            postalCode: postalCode,
            countryCode: countryCode
        };
        this.determineBusinessServiceabilityForAddress(address, callback);
    };
    /**
     * Determines cable providers that serve location specified by it's postal address.
     * @param address Location postal address.
     * @return Array of serviceability results from cable providers.
     * @throws KyrioException returned by the server.
     */
    ServiceabilityClient.prototype.determineBusinessServiceabilityForAddress = function (address, callback) {
        if (address == null)
            throw new Error('address cannot be null');
        if (callback == null)
            throw new Error('callback must be a function');
        // For local testing return mock without calling server
        if (this._account.enableTestLocal) {
            this.mockDetermineBusinessServiceability(address, callback);
            return;
        }
        // Prepare invocation parameters
        var route = ServiceabilityClient.BASE_ROUTE + '/serviceability';
        var params = {
            address_line1: address.line1,
            address_line2: address.line2,
            city: address.city,
            state: address.state,
            postal_code: address.postalCode,
            country_code: address.countryCode
        };
        // Invoke operation on the server
        _super.prototype.invoke.call(this, 'GET', route, params, null, function (err, response) {
            // Return invocation error
            if (err != null) {
                callback(err, null);
                return;
            }
            // Convert and return results
            response = response || [];
            var results = [];
            for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                var value = response_1[_i];
                var result = {
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
    };
    /**
     * Generates random test serviceability response.
     * @param address Location postal address.
     * @return Array of serviceability results from cable providers.
     * @throws KyrioException returned by the server.
     */
    ServiceabilityClient.prototype.mockDetermineBusinessServiceability = function (address, callback) {
        // Simulate random errors
        if (this._account.enableTestError && RandomData_1.RandomData.chance(1, 100)) {
            var err = RandomData_1.RandomData.nextError();
            callback(err, null);
            return;
        }
        var resultCount = RandomData_1.RandomData.nextInteger(0, 2);
        var results = [];
        for (var index = 0; index < resultCount; index++) {
            var provider = RandomData_1.RandomData.nextProvider();
            var result = {
                locationId: RandomData_1.RandomData.nextInteger(99999).toString(),
                locationType: RandomData_1.RandomData.pick([
                    LocationType_1.LocationType.Unknown, LocationType_1.LocationType.Residential, LocationType_1.LocationType.Business
                ]),
                providerId: provider.id,
                provider: provider.name,
                siteStatus: RandomData_1.RandomData.pick([
                    SiteStatus_1.SiteStatus.OnNet, SiteStatus_1.SiteStatus.OffNet, SiteStatus_1.SiteStatus.NearNet,
                    SiteStatus_1.SiteStatus.SurveyRequired, SiteStatus_1.SiteStatus.Proximity
                ])
            };
            results.push(result);
        }
        setTimeout(function () {
            callback(null, results);
        }, 1500);
    };
    ServiceabilityClient.BASE_ROUTE = '/business/api/v1';
    return ServiceabilityClient;
}(KyrioRestClient_1.KyrioRestClient));
exports.ServiceabilityClient = ServiceabilityClient;
//# sourceMappingURL=ServiceabilityClient.js.map