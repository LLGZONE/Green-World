const koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-bodyparser');
const schema = require('./schema');
const context = require('./models');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const routes = require('./routes/uploadImage');
// const admin = require('./routes/admin');

const app = new koa();
const router = new Router();

app.use(async (ctx, next) => {
  console.log('ip', ctx.request.headers['x-real-ip']);
  await next();
});

// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({ schema, context }));
router.get('/graphql', graphqlKoa({ schema, context }));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

router.use('/api/image', routes.routes(), routes.allowedMethods());
// router.use('/admin', admin.routes(), admin.allowedMethods())

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = {
  app
};
