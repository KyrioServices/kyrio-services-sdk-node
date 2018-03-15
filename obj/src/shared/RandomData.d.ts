import { KyrioError } from '../KyrioError';
import { Provider } from './Provider';
/**
 * Random data generator used to simulate server responses.
 */
export declare class RandomData {
    /**
     * All currently connected cable providers
     */
    static PROVIDERS: Provider[];
    /**
     * Generates random integer within specified range.
     * @param min A minimum for random values.
     * @param max A maximum for random values.
     * @return A random integer value.
     */
    static nextInteger(min: number, max?: number): number;
    /**
     * Picks a random element from values array.
     * @param values Array with possible values.
     * @return A random value.
     */
    static pick<T>(values: T[]): T;
    /**
     * Determines a random chance from maximum chances.
     * @param chances Number of chances to test.
     * @param maxChances Maximum number of chances.
     * @return <code>true</code> is chance happend or <code>false</code> otherwise.
     */
    static chance(chances: number, maxChances: number): boolean;
    /**
     * Generates random boolean value.
     * @return A random boolean value.
     */
    static nextBoolean(): boolean;
    /**
     * Picks a random cable provider from the list of registered providers.
     * @return A random cable provider.
     */
    static nextProvider(): Provider;
    /**
     * Generates a random error returned by Kyrio services.
     * @return A random error.
     */
    static nextError(): KyrioError;
}
