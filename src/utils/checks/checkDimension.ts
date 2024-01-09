// Function to check if a value of (height and width ) is within a specified range
export const isWithinRange = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
};

// check aspectRatio
export const isDimensionCompatible = (width : number, height: number) : boolean => {
    const calculateCompatibility = width / height;
    if (calculateCompatibility >= 0.5 && calculateCompatibility <= 2)
        return true;
    return false;
};