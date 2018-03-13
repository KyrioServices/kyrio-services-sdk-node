import { KyrioError } from './KyrioError';
import { Provider } from './Provider';
export declare class RandomData {
    static PROVIDERS: Provider[];
    static nextInteger(min: number, max?: number): number;
    static pick<T>(values: T[]): T;
    static chance(chances: number, maxChances: number): boolean;
    static nextBoolean(): boolean;
    static nextProvider(): Provider;
    static nextError(): KyrioError;
}
