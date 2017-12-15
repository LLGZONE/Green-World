const Bonus = require('../src/models/Bonus')
const User = require('../src/models/User')

User.addUser({
  name: 'llgtest',
  qq: '3294898345',
  phone: '1348485384',
  dorm: '沁苑',
  uid: '356432',
}).then(() => console.log('add User'))
  .catch(error => console.log(error.detail))

User.getUser('356432')
  .then(user=>console.log(user))

Bonus.getBonus('356432')
  .then(bonus=>console.log(bonus))

module.exports = knex