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