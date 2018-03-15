"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Unique codes that define Kyrio error types.
 */
var ErrorCode = /** @class */ (function () {
    function ErrorCode() {
    }
    /**
     * No connection to Kyrio servers.
     */
    ErrorCode.NO_CONNECTION = "NO_CONNECTION";
    /**
     * Kyrio was not able to authorize client by provided ID.
     */
    ErrorCode.UNAUTHORIZED = "UNAUTHORIZED";
    /**
     * Request contained invalid parameters.
     */
    ErrorCode.BAD_REQUEST = "BAD_REQUEST";
    /**
     * Cause of error was unknown.
     */
    ErrorCode.UNKNOWN = "UNKNOWN";
    /**
     * Internal server error.
     */
    ErrorCode.INTERNAL = "INTERNAL";
    /**
     * Response to server or MSOs failed after timeout.
     */
    ErrorCode.TIMEOUT = "TIMEOUT";
    /**
     * Server is temporary unavailable due to maintenance.
     */
    ErrorCode.MAINTENANCE = "MAINTENANCE";
    return ErrorCode;
}());
exports.ErrorCode = ErrorCode;
//# sourceMappingURL=ErrorCode.js.map