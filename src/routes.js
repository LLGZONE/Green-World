const router = require('koa-router')()
const koaBody = require('koa-bodyparser')
const uploadFile = require('./libs/utils/uploadFile')
const Bus = require('./models/Bus')
const Food = require('./models/Food')
const Cloth = require('./models/Cloth')

router.post('/api/image/:type', koaBody({multipart: true}), async (ctx, next) => {
  const type = ctx.params.type
  const acceptType = ['bus', 'food', 'cloth']
  const userId = ctx.request.body.userId

  if (!acceptType.includes(type)) {
    ctx.body = {
      error: "not support the type"
    }
  }

  const files = ctx.request.body.files
  const filePaths = await uploadFile(ctx.request.body.userId, type, files)
  const filePath = filePaths.join('&&')

  if (type === 'bus') {
    Bus.update(userId, {img_dir: filePath})
  }

  if (type === 'food') {
    Food.update(userId, ctx.request.body.addedAt, {img_dir: filePath})
  }

  if (type === 'cloth') {
    Cloth.update(userId, ctx.request.body.addAt, {img_dir: filePath})
  }

  ctx.body = {
    status: 'ok'
  }

  await next()
})

module.exports = router