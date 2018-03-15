/**
 * Exception that represents error responses from Kyrio Online services
 */
export declare class KyrioError {
    /**
     * Unique code that defines error type
     */
    code: string;
    /**
     * HTTP response code returned by server
     */
    status: number;
    /**
     * Textual descriotion of the error
     */
    message: string;
    /**
     * Original exception
     */
    cause: any;
}
