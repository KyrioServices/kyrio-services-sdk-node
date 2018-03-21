import { KyrioError } from '../KyrioError';
import { ErrorCode } from '../ErrorCode';
import { Provider } from './Provider';

/**
 * Random data generator used to simulate server responses.
 */
export class RandomData {
    /**
     * All currently connected cable providers
     */
    public static PROVIDERS: Provider[] = [
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

    /**
     * Generates random integer within specified range.
     * @param min A minimum for random values.
     * @param max A maximum for random values.
     * @return A random integer value.
     */
    public static nextInteger(min: number, max: number = null): number {
        if (max == null) {
            max = min;
            min = 0;
        }

        if (max - min <= 0)
            return min;

        return Math.floor(min + Math.random() * (max - min));
    }

    /**
     * Picks a random element from values array.
     * @param values Array with possible values.
     * @return A random value.
     */
    public static pick<T>(values: T[]): T {
        if (values == null || values.length == 0)
            return null;

        return values[RandomData.nextInteger(values.length)];
    }

    /**
     * Determines a random chance from maximum chances.
     * @param chances Number of chances to test.
     * @param maxChances Maximum number of chances.
     * @return <code>true</code> is chance happend or <code>false</code> otherwise.
     */
    public static chance(chances: number, maxChances: number): boolean {
    	chances = chances >= 0 ? chances : 0;
    	maxChances = maxChances >= 0 ? maxChances : 0;
    	if (chances == 0 && maxChances == 0)
        	return false;
    	
        maxChances = Math.max(maxChances, chances);
        let start = (maxChances - chances) / 2;
        let end = start + chances;
        let hit = Math.random() * maxChances;
        return hit >= start && hit <= end;
    }

    /**
     * Generates random boolean value.
     * @return A random boolean value.
     */
    public static nextBoolean(): boolean {
        return Math.random() * 100 < 50;
    }    
    
    /**
     * Picks a random cable provider from the list of registered providers.
     * @return A random cable provider.
     */
    public static nextProvider(): Provider {
        return RandomData.pick<Provider>(RandomData.PROVIDERS);
    }

    /**
     * Generates a random error returned by Kyrio services.
     * @return A random error.
     */
    public static nextError(): KyrioError {
        return (RandomData.chance(1, 2))
        ? <KyrioError> { code: ErrorCode.UNKNOWN, status: 500, message: 'Test error' }
        : <KyrioError> { code: ErrorCode.TIMEOUT, status: 504, message: 'Test timeout' };
    }
}