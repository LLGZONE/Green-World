const knex = require('knex')

class User {
  getUser(uid) {
    return knex('users')
      .where({
        uid
      })
  }

  addUser(info) {
    return knex('users')
      .insert(info)
  }

  updateUser(uid, info) {
    return knex('users')
      .where({
        uid,
      })
      .insert(info)
  }
}