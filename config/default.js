module.exports = {
  fastify: {
    logger: {
      level: 'info',
    },
    redis: {
      host: '127.0.0.1',
      keyPrefix: 'fr:',
    },
  },
}
