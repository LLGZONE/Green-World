const knex = require('../connector')
const Bonus = require('./Bonus')

class User {
  static getUser(uid) {
    return knex('users')
      .where({
        uid
      })
      .then(row => row[0])
  }

  static addUser(info) {
    Bonus.init(info.user_id)
    return knex('users')
      .insert(info)
  }

  static updateUser(uid, info) {
    return knex('users')
      .where({
        uid,
      })
      .insert(info)
  }
}

module.exports = User