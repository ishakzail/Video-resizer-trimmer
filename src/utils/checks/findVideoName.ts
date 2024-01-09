export const findVideoName = (fileName: string) : string => {
    const lastIndex = fileName.lastIndexOf('.');
    if (lastIndex !== -1) {
        return fileName.slice(0, lastIndex);
    }
    return fileName;
}