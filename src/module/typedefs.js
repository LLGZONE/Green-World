const User = require('./user/schema')
const RootQuery = require('./query/schema')
const Mutation = require('./mutation/schema')

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: Mutation
  }
`

module.exports = [SchemaDefinition, Mutation, RootQuery,User]