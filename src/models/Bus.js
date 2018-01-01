const knex = require('../connector')

class Bus {
  static get(user_id, startTime = '1970/1/1', endTime = '2099/10/01') {
    return knex('bus')
      .where({
        user_id,
      })
      .andWhere('add_at', '>', startTime)
      .andWhere('add_at', '<', endTime)
      .then(rows => rows.map(row => ({
        id: row.id,
        imgDir: row.img_dir.split('&&'),
        addAt: row.add_at,
        addedBonus: row.add_bonus
      })))
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
  static add(user_id, {
    addedAt: add_at,
    addedBonus: add_bonus,
    img_dir,
  }) {
    return knex('bus')
      .returning('id')
      .insert({
        user_id,
        add_at,
        img_dir,
        add_bonus,
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

  static update(user_id, id, info) {
    return knex('bus')
      .where({user_id, id})
      .update(info)
  }
}

module.exports = Bus