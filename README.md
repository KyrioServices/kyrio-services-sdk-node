# Node.js SDK to Kyrio Online Services

This SDK provides full access to Kyrio Online Services public API.

## Install

```bash
npm install kyrio-ols-sdk-node
```

## Use

```js
var sdk = require('kyrio-services-sdk-node');

var account = new sdk.KyrioAccount();
account.clientId = "999999";

var client = account.createServiceabilityClient();
client.determineBusinessServiceability(
    '858 Coal Creek Circle', null, 'Louisville', 'CO', '80027', 'US',
    function (err, results) {
        if (err) {
            console.error('Failed to call serviceability API');
            console.error(err);
        } else {
            console.log(results);
        }
    }
);
```

## References

- [API Documentation](https://rawgit.com/KyrioServices/kyrio-services-sdk-node/master/doc/api/index.html)

## License

This SDK is distributed under MIT license and free to use for all Kyrio clients.