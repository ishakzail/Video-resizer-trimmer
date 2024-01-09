import { FastifyReply, FastifyRequest } from "fastify";
import * as tmp from 'tmp';
import { promisify } from 'util';
import { TrimVideoRequest } from '../interfaces/interfaces'
import fs from 'fs'
import { 
    checkFieldsType,
        fileExists,
        findExtension, 
        findVideoName, 
        getVideoDuration, 
        hasRequiredFields, 
        isNumeric, 
        isSupportedVideoFormat, 
        isValidTrimDuration, 
        REQUIRED_TRIM_FIELDS, 
        trimVideo 
    } from '../utils'

const writeFileAsync = promisify(fs.writeFile);

export const trimVideoController = async (
    req: FastifyRequest<TrimVideoRequest>, 
    reply: FastifyReply) => {
        let removeCallback: (() => void) | undefined;
        try {
            // Check if all required fields are present in the request body
            if (!hasRequiredFields(req.body, REQUIRED_TRIM_FIELDS))
                return (reply.status(400).send({ message: 'Missing required fields' }));

            const {video, startTime, endTime } = req.body;

            // / Check if the field types match the required types
            if (!checkFieldsType(video.type, startTime.type, endTime.type))
                return (reply.status(400).send({ message: 'A field is not in the required type.' }));

            const uploadedVideo     = await video.toBuffer();
            const uploadedVideoName = findVideoName(video.filename); 
            const fileExtension     = findExtension(video.filename);

            // Check if startTime and endTime are numeric values
            if (!isNumeric(startTime.value) || !isNumeric(endTime.value))
                return (reply.status(400).send({ message: 'startTime and endTime must be numeric values.' }));

            // Check if the video format is supported
            if (!isSupportedVideoFormat(req.body.video.mimetype)) 
                return (reply.status(415).send({ message: 'Unsupported video format.' }));

            const parsedEndTime     = parseInt(endTime.value);
            const parsedStartTime   = parseInt(startTime.value);

            // Check if the trim duration is valid
            if (!isValidTrimDuration(parsedStartTime, parsedEndTime))
                return (reply.status(400).send({ message: 'Invalid trim duration.' }));
    
            const { name, fd, removeCallback: tmpRemoveCallback } = tmp.fileSync({postfix: `.${fileExtension}`});
            removeCallback = tmpRemoveCallback;

            // Write the buffer to the temporary file
            await writeFileAsync(fd, uploadedVideo);

            // get the video duration
            const videoDuration = await getVideoDuration(name);
            
            // Perform error handling based on the duration
            if (parsedEndTime > videoDuration) {
                return (reply.status(400).send({ message: 'End time exceeds video duration.' }));
            }

            const trimmedFolderPath = './uploads/';
            let uniqueFileName = `${uploadedVideoName}_trimmed.${fileExtension}`;

            // Check if the file already exists
            let fileIndex = 1;
            while (await fileExists(trimmedFolderPath + uniqueFileName)) {
                uniqueFileName = `${uploadedVideoName}_trimmed_${fileIndex}.${fileExtension}`;
                fileIndex++;
            }

            const trimmedVideoPath = `${trimmedFolderPath}${uniqueFileName}`;

            // Trim the video and save it to the uploads folder
            await trimVideo(name, trimmedVideoPath, parsedStartTime, parsedEndTime);

            return { message: 'Video trimmed successfully, check your uploads folder'};
        } catch (error) {
            reply.code(500).send({ message: error });
        } finally {
            // Remove the temporary file in case of (failure or success)
            if (removeCallback) {
                removeCallback();
            }
        }
}