const knex = require('../src/connector')
const Bonus = require('../src/models/Bonus')
const User = require('../src/models/User')


knex('users')
    .where({
      uid: '356432',
      name: undefined,
    })
    .del()
.catch(error => console.log(error.detail))