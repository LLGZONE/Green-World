const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./module/typedefs')
const resolvers = require('./module/resolvers')

export default makeExecutableSchema({
  typeDefs,
  resolvers
})