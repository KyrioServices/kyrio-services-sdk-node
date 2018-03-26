//var sdk = require('kyrio-services-sdk-node');
var sdk = require('../src/index');
var account = new sdk.KyrioAccount();
account.clientId = "999999";
account.enableTestMock = true;
account.enableTestError = true;
var client = account.createServiceabilityClient();
client.determineBusinessServiceability('858 Coal Creek Circle', null, 'Louisville', 'CO', '80027', 'US', function (err, results) {
    if (err) {
        console.error('Failed to call serviceability API');
        console.error(err);
    }
    else {
        console.log(results);
    }
});
//# sourceMappingURL=serviceability_sample.js.map