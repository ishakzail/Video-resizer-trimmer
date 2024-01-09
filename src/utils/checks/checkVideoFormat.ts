import { ALLOWED_VIDEO_MIMETYPE } from "../tools/constants";

export const isSupportedVideoFormat = (mimetype: string): boolean => {
    return ALLOWED_VIDEO_MIMETYPE.includes(mimetype);
};