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

    if (auth) {
      return auth
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

function expireToken(headers) {
  const token = getToken(headers)
  if (token) {
    return new Promise((resolve, reject) => {
      redisClient.del(token, (err) => {
        if (err) {
          reject(404)
        } else {
          resolve(200)
        }
      })
    })
  }

  return null
}

module.exports = {
  saveToRedis,
  getToken,
  veryfiToken,
  expireToken,
}