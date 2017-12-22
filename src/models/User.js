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

  static async addUser({userId}) {
    const [id] = await knex('users')
        .returning('id')
        .insert({uid: userId})
    await Bonus.init(userId)

    return id
  }

  static updateUser(uid, info) {
    return knex('users')
      .returning('id')
      .where({
        uid,
      })
      .update(info)
  }
}

module.exports = User