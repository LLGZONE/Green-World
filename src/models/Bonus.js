const knex = require('../connector');

class Bonus {
  static init(user_id) {
    return knex('bonus').insert({
      user_id
    });
  }

  static getBonus(user_id) {
    return knex('bonus')
      .where({
        user_id
      })
      .then(row => {
        return row[0];
      });
  }

  static async addBonus(user_id, bonus) {
    const [bs] = await knex('bonus').where({ user_id });
    return knex('bonus')
      .returning('id')
      .where({
        user_id
      })
      .update({ points: bs.points + bonus });
  }

  static async reduceBonus(user_id, bonus) {
    const [bs] = await knex('bonus').where({ user_id });
    return knex('bonus')
      .returning('id')
      .where({
        user_id
      })
      .update({ points: bs.points - bonus });
  }
}

module.exports = Bonus;
