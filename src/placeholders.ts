export class Placeholder {
    private placeholderValues: { [key: string]: string };

    constructor(placeholderValues: { [key: string]: string }) {
        this.placeholderValues = placeholderValues;
    }

    public replacePlaceholders(message: string): string {
        let result = message;

        Object.keys(this.placeholderValues).forEach((key) => {
            const regex = new RegExp(`\\{${key}\\}`, 'g');
            result = result.replace(regex, this.placeholderValues[key]);
        });

        return result;
    }

    public setPlaceholder(key: string, value: string) {
        this.placeholderValues[key] = value;
    }

    public getPlaceholder(key: string): string {
        return this.placeholderValues[key];
    }
}
