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
      return knex('users')
        .insert(info)
        .then(() => {
          return Bonus
            .init(info.uid)
        })
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