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
var ServiceabilityClient = /** @class */ (function (_super) {
    __extends(ServiceabilityClient, _super);
    function ServiceabilityClient(account) {
        return _super.call(this, account) || this;
    }
    ServiceabilityClient.prototype.determineBusinessServiceability = function (addressLine1, addressLine2, city, state, postalCode, country, callback) {
        var address = {
            line1: addressLine1,
            line2: addressLine2,
            city: city,
            state: state,
            postalCode: postalCode,
            country: country
        };
        this.determineBusinessServiceabilityForAddress(address, callback);
    };
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
            country: address.country
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
    ServiceabilityClient.prototype.mockDetermineBusinessServiceability = function (address, callback) {
        // Simulate random errors
        if (this._account.enableTestError && RandomData_1.RandomData.chance(1, 10)) {
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
    ServiceabilityClient.BASE_ROUTE = '/api/v1';
    return ServiceabilityClient;
}(KyrioRestClient_1.KyrioRestClient));
exports.ServiceabilityClient = ServiceabilityClient;
//# sourceMappingURL=ServiceabilityClient.js.map