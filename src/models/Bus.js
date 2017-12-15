const knex = require('../connector')

class Bus {
  static get(user_id) {
    return knex('bus')
      .where({
        user_id,
      })
      .select('*')
  }

  static getOne(user_id, add_at) {
    return knex('bus')
      .where({
        user_id,
        add_at,
      })
      .then(row => row[0])
  }
  //增加一条乘公交车出行的信息
  static add(user_id, {add_at, img_dir}) {
    return knex('bus')
      .insert({
        user_id,
        add_at,
        img_dir,
      })
  }

  static delete(user_id, add_at) {
    return knex('bus')
      .where({
        user_id,
        add_at,
      })
      .del()
  }
}

module.exports = Bus