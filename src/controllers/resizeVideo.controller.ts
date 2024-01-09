import { FastifyReply, FastifyRequest } from "fastify";
import { ResizeVideoRequest } from "../interfaces/interfaces";
import { 
        MAX_HEIGHT, MAX_WIDTH, 
        MIN_HEIGHT, MIN_WIDTH, 
        findExtension, findVideoName, 
        hasRequiredFields, isDimensionCompatible, 
        isNumeric, isSupportedVideoFormat, 
        isWithinRange, REQUIRED_RESIZE_FIELDS, 
        resizeVideo, 
        fileExists,
        checkFieldsType} from "../utils";
import { promisify } from 'util';
import * as tmp from 'tmp';
import fs from 'fs';

const writeFileAsync = promisify(fs.writeFile);

export const resizeVideoController = async  (
    req: FastifyRequest<ResizeVideoRequest>,
    reply: FastifyReply
    ) => {
    let removeCallback: (() => void) | undefined;
    try {
        // Check if all required fields are present in the request body
        if (!hasRequiredFields(req.body, REQUIRED_RESIZE_FIELDS)) 
            return(reply.status(400).send({ message: 'Missing required fields' }));


        const {video , height, width } = req.body;

        // Check if the field types match the required types
        if (!checkFieldsType(video.type, height.type, width.type))
            return (reply.status(400).send({ message: 'A field is not in the required type.' }));

        const uploadedVideo = await req.body.video.toBuffer();
        const uploadedVideoName = findVideoName(req.body.video.filename); 
        const fileExtension = findExtension(req.body.video.filename);

        // Check if height and width are numeric values
        if (!isNumeric(height.value) || !isNumeric(width.value)) 
            return (reply.status(400).send({ message: 'Height and width must be numeric values' }));

        // Check if the video format is supported
        if (!isSupportedVideoFormat(req.body.video.mimetype)) 
            return(reply.status(415).send({ message: 'Unsupported video format' }));

        const parsedHeight = parseInt(height.value);
        const parsedWidth = parseInt(width.value);

        // Check if height and width are within valid ranges
        if (!isWithinRange(parsedHeight, MIN_HEIGHT, MAX_HEIGHT) 
            || !isWithinRange(parsedWidth, MIN_WIDTH, MAX_WIDTH)) 
            return(reply.
                status(400).
                send({ message: 'Invalid height or width dimensions' , MAX_HEIGHT,MIN_HEIGHT, MIN_WIDTH, MAX_WIDTH}));
        
        // Check if the dimensions are compatible for resizing
        if (!isDimensionCompatible(parsedWidth, parsedHeight))
            return(reply.status(400).send({ message: 'Dimensions are not compatible try to adjust them' }));

        const { name, fd, removeCallback : tmpRemoveCallback } = tmp.fileSync({postfix: `.${fileExtension}`});
        removeCallback = tmpRemoveCallback;

        // Write the buffer to the temporary file
        await writeFileAsync(fd, uploadedVideo);
        
        const resizedFolderPath = './uploads/';
        let uniqueFileName = `${uploadedVideoName}_${height}x${width}.${fileExtension}`;

        // Check if the file already exists
        let fileIndex = 1;
        while (await fileExists(resizedFolderPath + uniqueFileName)) {
            uniqueFileName = `${uploadedVideoName}_${height}x${width}_${fileIndex}.${fileExtension}`;
            fileIndex++;
        }

        const resizedVideoPath = `${resizedFolderPath}${uniqueFileName}`;

        // Resize the video and save it to the uploads folder
        await resizeVideo(name, resizedVideoPath, parsedWidth, parsedHeight);
        return { message: 'Video resized successfully , check your uploads folder' };
    } 
    catch (error) {
        reply.code(500).send({ message: 'Internal Server Error' });
    }
    finally {
        // Remove the temporary file in case of (failure or success)
        if (removeCallback) {
            removeCallback();
        }
    }
};