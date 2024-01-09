import { FastifyInstance } from 'fastify'
import * as controllers from '../controllers'

export const resizeVideoRouter = async (fastify: FastifyInstance) => {
    fastify.route({
        method: 'POST',
        url: '/resize-video',
        handler: controllers.resizeVideoController,
    });
}