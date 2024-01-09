export const isNumeric = (value: string): boolean => {
    return /^\d+$/.test(value);
};