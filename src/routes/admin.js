const router = require('koa-router')();
const koaParser = require('koa-bodyparser');
const crypto = require('crypto');
const { ap, an, sk } = require('../libs/secrets');

router.post('/', koaParser(), async (ctx, next) => {
  const username = ctx.request.body.username;
  const password = ctx.request.body.password;

  console.log(username, password, ctx.request.body);
  if (username !== an || password !== ap) {
    ctx.body = {
      error: 'username or password wrong'
    };
    return;
  }

  ctx.body = {
    error: ''
  };

  await next();
});

module.exports = router;
