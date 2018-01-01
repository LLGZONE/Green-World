const koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-bodyparser')
const schema = require('./schema')
const context = require('./models')
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa')
const routes = require('./routes')

const app = new koa()
const router = new Router()

// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({ schema, context }));
router.get('/graphql', graphqlKoa({ schema, context }));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

router.use('/api/image', routes.routes(), routes.allowedMethods())

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app