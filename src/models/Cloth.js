const knex = require('../connector')

class Cloth {
  static add(user_id, {
    type,
    addedAt: add_at,
    num,
    addedBonus: add_bonus,
    img_dir,
  }) {
    return knex('cloth')
      .returning('id')
      .insert({
        user_id,
        type,
        add_at,
        num,
        add_bonus,
        img_dir,
      })
  }

  //查看用户在某个时候段所有衣物相关情况
  static get(user_id, startTime = '1970/1/1', endTime = '2099/10/01') {
    return knex('cloth')
      .where('user_id', user_id)
      .andWhere('add_at', '>', startTime)
      .andWhere('add_at', '<', endTime)
      .then(rows => rows.map(row => ({
        id: row.id,
        type: row.type,
        num: row.num,
        addedBonus: row.add_bonus,
        imgDir: row.img_dir,
        addedAt: row.add_at,
      })))
  }

  static getOne(user_id, add_at) {
    return knex('cloth')
      .where({
        user_id,
        add_at,
      })
      .first()
  }

  static getLatest(user_id) {
    return knex('cloth')
      .where({user_id})
      .orderBy('add_at', 'desc')
      .first()
  }

  static del(user_id, add_at) {
    return knex('cloth')
      .where({user_id, add_at})
      .del()
  }

  static update(user_id, add_at, info) {
    return knex('cloth')
      .where({user_id, add_at})
      .update(info)
  }
}

module.exports = Cloth