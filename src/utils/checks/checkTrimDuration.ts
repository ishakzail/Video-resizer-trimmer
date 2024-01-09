export const isValidTrimDuration = (start: number, end: number): boolean => {
    if (start >= end)
        return false;
    return true;
}