export class EnumUtils {
    public static convertToEnum<T>(enumType: T, status: string): T[keyof T] {
        return enumType[status as keyof T];
    }

    public static getEnumDescription<T extends Record<string, string>>(
        descriptions: Record<T[keyof T], string>,
        value: T[keyof T]
    ): string | undefined {
        return descriptions[value];
    }
}