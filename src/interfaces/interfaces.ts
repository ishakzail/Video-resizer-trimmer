
export interface TrimVideoRequest {
    Body: {
        video: {
            toBuffer: () => Buffer,
            filename: string,
            type: string,
            fieldname: string,
            mimetype: string
        };
        startTime: {
            value: string,
            fieldname: string,
            type: string
        };
        endTime: {
            value: string,
            fieldname: string,
            type: string
        };
    };
}

export interface ResizeVideoRequest {
    Body: {
        video: {
            toBuffer: () => Buffer,
            filename: string,
            type: string,
            fieldname: string,
            mimetype: string
        };
        height: {
            value: string,
            fieldname: string,
            type: string,
        };
        width: {
            value: string,
            fieldname: string,
            type: string,
        };
    };
}

export interface TrimVideoRequest {
    Body: {
        video: {
            toBuffer: () => Buffer,
            filename: string,
            type: string,
            fieldname: string,
            mimetype: string
        };
        startTime: {
            value: string,
            fieldname: string,
            type: string
        };
        endTime: {
            value: string,
            fieldname: string,
            type: string
        };
    };
}

export interface UploadVideoRequest {
    Body: {
        video: {
            toBuffer: () => Buffer,
            filename: string,
            type: string,
            fieldname: string,
            mimetype: string
        };
    };
}