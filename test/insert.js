const knex = require('knex')({
  client: 'pg',
  version: '7.4.0',
  connection: {
    host : '127.0.0.1',
    user : 'ubuntu',
    password : 'LLGllg123',
    database : 'test'
  }
});


knex('users')
  .insert({
    name: 'llg',
    qq: '985395976',
    phone: '13975267383',
    dorm: 'qinyuan',
    uid: 'llg'
  })
  .catch((error => console.log(error.detail)))

knex('users')
  .select()
  .where({
    qq: '985395976'
  })
  .then((row) => console.log(row[0]))

knex('users')
  .where({
    name: 'llg'
  })
  .update({
    dorm: '沁苑'
  })
  .then(row => console.log(row))

module.exports = knex