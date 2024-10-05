export class ValidationService {
    static isNothing(value: any): boolean {
        return (value === undefined || value === null);
    }
}