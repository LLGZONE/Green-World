const User = require('./user/schema')
const Mutation = require('./mutation/schema')

const RootQuery = `
  type RootQuery {
    user(id: Int!): User
  }
`

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: Mutation
  }
`

module.exports = [SchemaDefinition, Mutation, RootQuery,User]