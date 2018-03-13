let assert = require('chai').assert;

import { KyrioAccount } from '../src/KyrioAccount';

suite('KyrioAccount', () => {

    test('Set Server URL', () => {
        let account = new KyrioAccount();
        account.serverUrl = 'https://api.kyrio.com:8080';
        assert.equal('https://api.kyrio.com:8080', account.serverUrl);

        try {
            account.serverUrl = 'xyz';
            assert.fail('Must validate serverUrl');
        } catch {
            // Expected exception
        }

        try {
            account.serverUrl = null;
            assert.fail('Must validate serverUrl');
        } catch {
            // Expected exception
        }
    });

    test('Set Client ID', () => {
        let account = new KyrioAccount();
        account.clientId = '123456';
        assert.equal('123456', account.clientId);

        try {
            account.clientId = 'abcxyz';
            assert.fail('Must validate clientId');
        } catch {
            // Expected exception
        }

        try {
            account.clientId = null;
            assert.fail('Must validate clientId');
        } catch {
            // Expected exception
        }

        try {
            account.clientId = '1234567';
            assert.fail('Must validate clientId');
        } catch {
            // Expected exception
        }
    });

    test('Set Test Properties', () => {
        let account = new KyrioAccount();
        account.clientId = '123456';

        account.enableTestError = true;
        assert.isTrue(account.enableTestError);

        account.enableTestMock = true;
        assert.isTrue(account.enableTestMock);

        account.enableTestLocal = true;
        assert.isTrue(account.enableTestLocal);
    });

    test('Create Serviceability Client', () => {
        let account = new KyrioAccount();
        account.clientId = '123456';

        let client = account.createServiceabilityClient();
        assert.isObject(client);
    });
    
});
