const { merge } = require('lodash')
const user = require('./user/resolvers')
const bonus = require('./bonus/resolvers')
const mutation = require('./mutation/resolvers')
const query = require('./query/resolvers')

const resolvers =  merge(mutation, query, user, bonus)

module.exports = resolvers