import { ResizeVideoRequest, TrimVideoRequest } from "../../interfaces/interfaces";

// Function to check if req body contains required fields
export const hasRequiredFields = (body: any, fields: string[]): boolean => {
    if (!body) return false;
    return fields.every(field => field in body);
};

export const checkFieldsType = (
    videoType: string, feild1Type : string, feild2Type : string): boolean => {
    if (videoType !== 'file' || feild1Type !== 'field' || feild2Type !== 'field')
        return false;
    return true;
}