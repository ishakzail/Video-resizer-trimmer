export const REQUIRED_RESIZE_FIELDS = 
    ['height', 'width', 'video'];

export const REQUIRED_TRIM_FIELDS = 
    ['startTime', 'endTime', 'video'];

export const REQUIRE_UPLOAD_FIELD =
    ['video'];
    
export const ALLOWED_VIDEO_MIMETYPE = 
    [
        'video/mp4',        // .mp4
        'video/mpeg',       // .mpeg
        'video/quicktime',  // .mov
        'video/3gpp',       // .3gp
        'video/x-msvideo',  // .avi
        'video/x-ms-wmv',   // .wmv

    ];

export const MAX_HEIGHT = 1080;
export const MAX_WIDTH  = 1920;
export const MIN_HEIGHT = 144;
export const MIN_WIDTH  = 256;