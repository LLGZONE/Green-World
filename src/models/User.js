const knex = require('knex')

class User {
  getUser(uid) {
    return knex('user')
      .where({
        uid
      })
      .select()
  }
}