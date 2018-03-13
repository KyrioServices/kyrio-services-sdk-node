"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode_1 = require("./ErrorCode");
var RandomData = /** @class */ (function () {
    function RandomData() {
    }
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
    RandomData.pick = function (values) {
        if (values == null || values.length == 0)
            return null;
        return values[RandomData.nextInteger(values.length)];
    };
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
    RandomData.nextBoolean = function () {
        return Math.random() * 100 < 50;
    };
    RandomData.nextProvider = function () {
        return RandomData.pick(RandomData.PROVIDERS);
    };
    RandomData.nextError = function () {
        return (RandomData.chance(1, 2))
            ? { code: ErrorCode_1.ErrorCode.UNKNOWN, status: 500, message: 'Test error' }
            : { code: ErrorCode_1.ErrorCode.TIMEOUT, status: 504, message: 'Test timeout' };
    };
    RandomData.PROVIDERS = [
        { id: "1002", name: "Time Warner Cable" },
        { id: "1005", name: "Comcast" },
        { id: "1008", name: "Adelphia" },
        { id: "1010", name: "Cox Communications" },
        { id: "1011", name: "Charter" },
        { id: "1012", name: "Insight Communications" },
        { id: "1014", name: "Mediacom" },
        { id: "1015", name: "Cablevision" },
        { id: "1016", name: "Cable One" },
        { id: "1017", name: "Bright House Networks" },
        { id: "1018", name: "Suddenlink" },
        { id: "1024", name: "Massillon Cable" },
        { id: "1027", name: "Clear Picture, Inc" },
        { id: "1099", name: "LotsACable" },
        { id: "1111", name: "Ridge Cable" },
        { id: "1236", name: "Mythical Cable" },
        { id: "1237", name: "NewMythical Cable" }
    ];
    return RandomData;
}());
exports.RandomData = RandomData;
//# sourceMappingURL=RandomData.js.map