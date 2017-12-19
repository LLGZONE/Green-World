const UserInfo = require('./user/schema')
const Recycle = require('./recycle/schema')
const RootQuery = require('./query/schema')
const Mutation = require('./mutation/schema')

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: Mutation
  }
`

const typedefs = [SchemaDefinition, Mutation, RootQuery, ...UserInfo, Recycle]

module.exports = typedefs