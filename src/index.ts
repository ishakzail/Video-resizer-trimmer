import fastify from 'fastify'
import formBody from '@fastify/formbody';
import multipart from '@fastify/multipart'
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import {
        trimVideoRouter,
        resizeVideoRouter,
        uploadVideoRouter
      } from './routes';

const port : number = 3001;
if (ffmpegPath)
    ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobeStatic.path);
const startServer = async () => {
    try {
      const server = fastify({
        bodyLimit: 700 * 1024 * 1024,
      });
      server.register(formBody);
      server.register(multipart,{ attachFieldsToBody: true});
      server.register(trimVideoRouter, { prefix: '/api' })
      server.register(resizeVideoRouter, { prefix: '/api' });
      server.register(uploadVideoRouter, { prefix: '/api' });
      server.get('/', (request, reply) => {
        reply.send({ name: 'fastify-typescript-ffmpeg' })
      })
      await server.listen({port: port});
      console.log('server listen at port :', port);
    } catch (e) {
      console.error(e)
    }
  }
startServer();