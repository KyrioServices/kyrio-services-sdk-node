/**
 * Unique codes that define Kyrio error types.
 */
export class ErrorCode {
    /**
     * No connection to Kyrio servers.
     */
    public static readonly NO_CONNECTION: string = "NO_CONNECTION";

    /**
     * Kyrio was not able to authorize client by provided ID.
     */
    public static readonly UNAUTHORIZED: string = "UNAUTHORIZED";

    /**
     * Request contained invalid parameters.
     */
    public static readonly BAD_REQUEST: string = "BAD_REQUEST";

    /**
     * Cause of error was unknown.
     */
    public static readonly UNKNOWN: string = "UNKNOWN";

    /**
     * Internal server error.
     */
    public static readonly INTERNAL: string = "INTERNAL";

    /**
     * Response to server or MSOs failed after timeout.
     */
    public static readonly TIMEOUT: string = "TIMEOUT";

    /**
     * Server is temporary unavailable due to maintenance.
     */
    public static readonly MAINTENANCE: string = "MAINTENANCE";
}