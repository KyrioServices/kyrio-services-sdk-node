let assert = require('chai').assert;
let sdk = require('../../src/index');

import { KyrioAccount } from '../../src/KyrioAccount';

suite('ServiceabilityClient', () => {

    test('Determine Business Serviceability Mock', (done) => {
        let account: KyrioAccount = new sdk.KyrioAccount();
        account.clientId = '999999';
        account.enableTestLocal = true;

        let client = account.createServiceabilityClient();
        client.determineBusinessServiceability(
            '858 Coal Creek Circle', null, 'Louisville', 'CO', '80027', 'US',
            (err, results) => {
                assert.isNull(err);
                assert.isArray(results);
                done();
            }
        )
    });

    test('Determine Business Serviceability', (done) => {
        let account: KyrioAccount = new sdk.KyrioAccount;
        account.clientId = '999999';
        account.enableTestMock = true;
        account.enableTestError = false;

        let client = account.createServiceabilityClient();
        client.determineBusinessServiceability(
            '858 Coal Creek Circle', null, 'Louisville', 'CO', '80027', 'US',
            (err, results) => {
                assert.isNull(err);
                assert.isArray(results);
                done();
            }
        )
    });
    
});
