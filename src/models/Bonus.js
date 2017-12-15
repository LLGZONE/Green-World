const knex = require('knex')

class Bonus {
  getBonus(user_id) {
    return knex('bonus')
      .where({
        user_id
      })
      .then((row) => {
        return row.bonus
      })
  }

  addBonus(user_id, bonus) {
    return knex('bonus')
      .where({
        user_id
      })
      .increment('points', bonus)
  }

  reduceBonus(user_id, bonus) {
    return knex('bonus')
      .where({
        user_id
      })
      .decrement('points', bonus)
  }
}