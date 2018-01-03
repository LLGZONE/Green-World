const router = require('koa-router')()
const koaParser = require('koa-bodyparser')
const crypto = require('crypto')
const { ap, an, sk } = require('../libs/secrets')
const { saveToRedis, expireToken, getToken } = require('../redis')

router.post('/', koaParser(), async (ctx, next) => {
  const username = ctx.request.body.username
  const password = ctx.request.body.password

  if (username !== an || password !== ap) {
    ctx.body = {
      error: 'username or password wrong'
    }
  }

  const hashPassword = crypto
    .createHmac('sha256', sk)
    .update(ap)
    .digest('hex')

  const randomL = Math.floor(Math.random() * 40)
  const randomR = randomL + 20

  const userId = hashPassword.substring(randomL, randomR)
  saveToRedis(userId)

  ctx.body = {
    userId,
  }

  await next()
})

//logout
router.post('delete', koaParser(),async (ctx, next) => {
  await expireToken(ctx.header, (err) => {
    if (err) {
      ctx.status = 404
    } else {
      ctx.status = 200
    }
  })

  await next()
})

module.exports = router