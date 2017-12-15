const knexfile = require('./libs/config/knexfile')
const knex = require('knex')(knexfile[process.env.NODE_ENV] || 'development')

module.exports = knex