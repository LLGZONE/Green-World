const { merge } = require('lodash')
const { user } = require('./user/resolvers')
const { bonus } = require('./bonus/resolvers')
const { mutation } = require('./mutation/resolvers')

module.exports =  merge(mutation, user, bonus)