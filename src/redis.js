const redis = require('redis')
const redisClient = redis.createClient()

const TOKEN_EXPIRE_TIME = 3600 * 10

function saveToRedis(token) {
  redisClient.set(token, 1)
  redisClient.expire(token, TOKEN_EXPIRE_TIME)
}

function getToken(headers) {
  if (headers && headers.authorization) {
    const auth = headers.authorization
    const part = auth.split(' ')

    if (part.length === 2) {
      return part[1]
    }
  }

  return null
}

async function veryfiToken(ctx, next) {
  const token = getToken(ctx.headers)

  if (token) {
    redisClient.get(token, (err, reply) => {
      if (err) {
        console.log(err);
        ctx.status = 404
      }
      if (!reply) {
        ctx.status = 404
      }
    })
  }

  await next()
}

function expireToken(headers, cb) {
  const token = getToken(headers)
  if (token) {
    redisClient.remove(token, cb)
  }
}

module.exports = {
  saveToRedis,
  getToken,
  veryfiToken,
  expireToken,
}