"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode_1 = require("../ErrorCode");
/**
 * Random data generator used to simulate server responses.
 */
var RandomData = /** @class */ (function () {
    function RandomData() {
    }
    /**
     * Generates random integer within specified range.
     * @param min A minimum for random values.
     * @param max A maximum for random values.
     * @return A random integer value.
     */
    RandomData.nextInteger = function (min, max) {
        if (max === void 0) { max = null; }
        if (max == null) {
            max = min;
            min = 0;
        }
        if (max - min <= 0)
            return min;
        return Math.floor(min + Math.random() * (max - min));
    };
    /**
     * Picks a random element from values array.
     * @param values Array with possible values.
     * @return A random value.
     */
    RandomData.pick = function (values) {
        if (values == null || values.length == 0)
            return null;
        return values[RandomData.nextInteger(values.length)];
    };
    /**
     * Determines a random chance from maximum chances.
     * @param chances Number of chances to test.
     * @param maxChances Maximum number of chances.
     * @return <code>true</code> is chance happend or <code>false</code> otherwise.
     */
    RandomData.chance = function (chances, maxChances) {
        chances = chances >= 0 ? chances : 0;
        maxChances = maxChances >= 0 ? maxChances : 0;
        if (chances == 0 && maxChances == 0)
            return false;
        maxChances = Math.max(maxChances, chances);
        var start = (maxChances - chances) / 2;
        var end = start + chances;
        var hit = Math.random() * maxChances;
        return hit >= start && hit <= end;
    };
    /**
     * Generates random boolean value.
     * @return A random boolean value.
     */
    RandomData.nextBoolean = function () {
        return Math.random() * 100 < 50;
    };
    /**
     * Picks a random cable provider from the list of registered providers.
     * @return A random cable provider.
     */
    RandomData.nextProvider = function () {
        return RandomData.pick(RandomData.PROVIDERS);
    };
    /**
     * Generates a random error returned by Kyrio services.
     * @return A random error.
     */
    RandomData.nextError = function () {
        return (RandomData.chance(1, 2))
            ? { code: ErrorCode_1.ErrorCode.UNKNOWN, status: 500, message: 'Test error' }
            : { code: ErrorCode_1.ErrorCode.TIMEOUT, status: 504, message: 'Test timeout' };
    };
    /**
     * All currently connected cable providers
     */
    RandomData.PROVIDERS = [
        { id: "2000", name: "Local Test Cable Provider A" },
        { id: "2001", name: "Local Test Cable Provider B" },
        { id: "2002", name: "Local Test Cable Provider C" },
        { id: "2003", name: "Local Test Cable Provider D" },
        { id: "2004", name: "Local Test Cable Provider E" },
        { id: "2005", name: "Local Test Cable Provider F" },
        { id: "2006", name: "Local Test Cable Provider G" },
        { id: "2007", name: "Local Test Cable Provider H" },
        { id: "2008", name: "Local Test Cable Provider I" },
        { id: "2009", name: "Local Test Cable Provider J" },
        { id: "2010", name: "Local Test Cable Provider K" },
        { id: "2011", name: "Local Test Cable Provider L" },
        { id: "2012", name: "Local Test Cable Provider M" },
        { id: "2013", name: "Local Test Cable Provider N" },
        { id: "2014", name: "Local Test Cable Provider O" },
        { id: "2015", name: "Local Test Cable Provider P" },
        { id: "2016", name: "Local Test Cable Provider Q" }
    ];
    return RandomData;
}());
exports.RandomData = RandomData;
//# sourceMappingURL=RandomData.js.map