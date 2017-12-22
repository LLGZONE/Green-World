const knex = require('../connector')

class Bonus {
  static init(user_id) {
    return knex('bonus')
      .insert({
        user_id,
      })
  }

  static getBonus(user_id) {
    return knex('bonus')
      .where({
        user_id
      })
      .then((row) => {
        return row[0]
      })
  }

  static addBonus(user_id, bonus) {
    return knex('bonus')
      .returning('id')
      .where({
        user_id
      })
      .increment('points', bonus)
  }

  static reduceBonus(user_id, bonus) {
    return knex('bonus')
      .where({
        user_id
      })
      .decrement('points', bonus)
  }
}

module.exports = Bonus