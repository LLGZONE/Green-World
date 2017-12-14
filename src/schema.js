const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./module/typedefs')

export default makeExecutableSchema({
  typeDefs,
  resolvers
})