const config = require('config')
const fastify = require('fastify')({ logger: config.fastify.logger })

fastify.register(require('fastify-redis'), config.fastify.redis)

fastify.route({
  method: 'GET',
  url: '/xread',
  schema: {
    querystring: {
      key: { type: 'string' },
      count: { type: 'number' },
      block: { type: 'number' },
    },
  },
  preHandler: async (request, reply) => {},
  handler: async (request, reply) => {
    const { redis } = fastify
    const { key, id = '0', count = 1 } = request.query
    const res = await redis.xread('count', count, 'streams', key, id)
    if (res && res[0] && res[0][1]) {
      const items = res[0][1]
      reply.send({ items })
    } else {
      const items = []
      reply.send({ items })
    }
  },
})

const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
