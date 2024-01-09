import { promisify } from "util";
import { UploadVideoRequest } from "../interfaces/interfaces";
import { FastifyReply, FastifyRequest } from "fastify";
import { REQUIRE_UPLOAD_FIELD, fileExists, findExtension, findVideoName, hasRequiredFields, isSupportedVideoFormat } from "../utils";
import fs from 'fs'

const writeFileAsync = promisify(fs.writeFile);

export const uploadVideoController = async (
  req: FastifyRequest<UploadVideoRequest>,
  reply: FastifyReply
) => {
  
  try {
      // Check if all required fields are present in the request body
      if (!hasRequiredFields(req.body, REQUIRE_UPLOAD_FIELD)) {
        return reply.status(400).send({ message: 'Missing required field' });
      }

      // Extract information from the request body
      const { video } = req.body;

      if (video.type !== 'file')
        return (reply.status(405).send({message : 'video field must be a file type.'}));

      const uploadedVideo = await video.toBuffer();
      const uploadedVideoName = findVideoName(video.filename);
      const fileExtension = findExtension(video.filename);

      // Check if the video format is supported
      if (!isSupportedVideoFormat(req.body.video.mimetype)) {
        return reply.status(415).send({ message: 'Unsupported video format.' });
      }

      const uploadFolderPath = './uploads/';
      let uniqueFileName = video.filename;

      // Check if the file already exists
      let fileIndex = 1;
      while (await fileExists(uploadFolderPath + uniqueFileName)) {
        uniqueFileName = `${uploadedVideoName}_${fileIndex}.${fileExtension}`;
        fileIndex++;
      }

      const uploadVideoPath = `${uploadFolderPath}${uniqueFileName}`;

      // Write the buffer directly to the upload folder
      await writeFileAsync(uploadVideoPath, uploadedVideo);

      return { message: 'Video uploaded successfully, check your uploads folder.' };
  } catch (error) {
    reply.code(500).send({ message: error });
  }
};

