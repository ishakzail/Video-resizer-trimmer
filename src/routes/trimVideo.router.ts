import { FastifyInstance } from 'fastify'
import * as controllers from '../controllers'

export const trimVideoRouter = async (fastify: FastifyInstance) => {
    fastify.route({
        method: 'POST',
        url: '/trim-video',
        handler: controllers.trimVideoController,
    });
}