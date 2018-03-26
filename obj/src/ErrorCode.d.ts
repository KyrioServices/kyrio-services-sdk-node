/**
 * Unique codes that define Kyrio error types.
 */
export declare class ErrorCode {
    /**
     * No connection to Kyrio servers.
     */
    static readonly NO_CONNECTION: string;
    /**
     * Kyrio was not able to authorize client by provided ID.
     */
    static readonly UNAUTHORIZED: string;
    /**
     * Request contained invalid parameters.
     */
    static readonly BAD_REQUEST: string;
    /**
     * Cause of error was unknown.
     */
    static readonly UNKNOWN: string;
    /**
     * Internal server error.
     */
    static readonly INTERNAL: string;
    /**
     * Response to server or MSOs failed after timeout.
     */
    static readonly TIMEOUT: string;
    /**
     * Server is temporary unavailable due to maintenance.
     */
    static readonly MAINTENANCE: string;
}
