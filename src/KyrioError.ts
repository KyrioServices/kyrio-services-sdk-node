/**
 * Exception that represents error responses from Kyrio Online services
 */
export class KyrioError {
    /**
     * Unique code that defines error type
     */
    public code: string;

    /**
     * HTTP response code returned by server
     */
    public status: number;

    /**
     * Textual descriotion of the error
     */
    public message: string;

    /**
     * Original exception
     */
    public cause: any;
}