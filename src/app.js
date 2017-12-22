const koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-bodyparser')
const schema = require('./schema')
const context = require('./models')
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa')

const app = new koa()
const router = new Router()

// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({ schema, context }));
router.get('/graphql', graphqlKoa({ schema, context }));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app