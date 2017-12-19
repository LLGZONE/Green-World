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

  static addUser({userId}) {
      return knex('users')
        .insert({uid: userId})
        .returning('id')
        .then(() => {
          return Bonus
            .init(userId)
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