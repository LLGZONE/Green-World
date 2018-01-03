const router = require('koa-router')()
const koaBody = require('koa-body')
const uploadFile = require('../libs/utils/uploadFile')
const Bus = require('../models/Bus')
const Food = require('../models/Food')
const Cloth = require('../models/Cloth')

router.post('/:type', koaBody({multipart: true}), async (ctx, next) => {
  const type = ctx.params.type
  const acceptType = ['bus', 'food', 'cloth']
  const { userId, id } = ctx.request.body.fields

  if (!acceptType.includes(type)) {
    ctx.body = {
      error: "not support the type"
    }
  }

  console.log(id, userId, ctx.request.body)

  const files = ctx.request.body.files
  const filePaths = uploadFile(ctx.request.body.userId, type, files)
  const filePath = filePaths.join('&&')
  console.log('files:', filePath)
  if (type === 'bus') {
    await Bus.update(userId, id, {img_dir: filePath})
  }

  if (type === 'food') {
    await Food.update(userId, id, {img_dir: filePath})
  }

  if (type === 'cloth') {
    await Cloth.update(userId, id, {img_dir: filePath})
  }

  ctx.body = {
    status: 'ok'
  }

  await next()
})

module.exports = router