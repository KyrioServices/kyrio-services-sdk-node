let assert = require('chai').assert;

import { RandomData } from '../../src/shared/RandomData';

suite('RandomData', () => {

    test('Next Integer', () => {
        let value1 = RandomData.nextInteger(0, 100);
        let value2 = RandomData.nextInteger(100);
        let value3 = RandomData.nextInteger(100);

        assert.isTrue(value1 != value2 || value2 != value3);
    });

    test('Next Boolean', () => {
        let value1 = RandomData.nextBoolean();
        let value2 = RandomData.nextBoolean();
        let value3 = RandomData.nextBoolean();

        //assert.isTrue(value1 != value2 || value2 != value3);
    });

    test('Chance', () => {
        let value1 = RandomData.chance(1, 10);
        let value2 = RandomData.chance(1, 10);
        let value3 = RandomData.chance(1, 10);

        //assert.isTrue(value1 != value2 || value2 != value3);
    });

    test('Pick', () => {
        let value1 = RandomData.pick<number>([1, 2, 3, 4, 5, 6, 7]);
        let value2 = RandomData.pick<number>([1, 2, 3, 4, 5, 6, 7]);
        let value3 = RandomData.pick<number>([1, 2, 3, 4, 5, 6, 7]);

        assert.isTrue(value1 != value2 || value2 != value3);
    });

    test('Next Provider', () => {
        let value1 = RandomData.nextProvider();
        let value2 = RandomData.nextProvider();
        let value3 = RandomData.nextProvider();

        assert.isTrue(value1.id != value2.id || value2.id != value3.id);
    });
    
});
