const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./module/typedefs')
const resolvers = require('./module/resolvers')

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
})