import { KyrioError } from '../KyrioError';
import { ErrorCode } from '../ErrorCode';
import { Provider } from './Provider';

export class RandomData {
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

    public static nextInteger(min: number, max: number = null): number {
        if (max == null) {
            max = min;
            min = 0;
        }

        if (max - min <= 0)
            return min;

        return Math.floor(min + Math.random() * (max - min));
    }

    public static pick<T>(values: T[]): T {
        if (values == null || values.length == 0)
            return null;

        return values[RandomData.nextInteger(values.length)];
    }

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

    public static nextBoolean(): boolean {
        return Math.random() * 100 < 50;
    }    
    
    public static nextProvider(): Provider {
        return RandomData.pick<Provider>(RandomData.PROVIDERS);
    }

    public static nextError(): KyrioError {
        return (RandomData.chance(1, 2))
        ? <KyrioError> { code: ErrorCode.UNKNOWN, status: 500, message: 'Test error' }
        : <KyrioError> { code: ErrorCode.TIMEOUT, status: 504, message: 'Test timeout' };
    }
}