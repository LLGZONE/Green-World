const koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-bodyparser');
const schema = require('./schema');
const context = require('./models');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const routes = require('./routes/uploadImage');
const admin = require('./routes/admin');
const session = require('koa-session');

const app = new koa();
const router = new Router();
app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: false /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));

const cors = require('@koa/cors');
app.use(cors());

app.use(async (ctx, next) => {
  console.log('ip', ctx.request.headers['x-real-ip']);
  await next();
});

// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({ schema, context }));
router.get('/graphql', graphqlKoa({ schema, context }));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

router.use('/api/image', routes.routes(), routes.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = {
  app
};
