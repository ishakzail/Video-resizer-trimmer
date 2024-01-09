import { FastifyInstance } from 'fastify'
import * as controllers from '../controllers'

export const uploadVideoRouter = async (fastify: FastifyInstance) => {
    fastify.route({
        method: 'POST',
        url: '/upload-video',
        handler: controllers.uploadVideoController,
    });
}