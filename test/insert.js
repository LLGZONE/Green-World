const knex = require('../src/connector')
const Bonus = require('../src/models/Bonus')
const User = require('../src/models/User')

console.log(User.addUser({userId: 123}).then(id => console.log(id)))

module.exports = 'lala'