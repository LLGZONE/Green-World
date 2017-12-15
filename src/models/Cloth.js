const knex = require('../connector')

class Cloth {
  static add(user_id, {type, add_at, num, add_bonus, img_dir}) {
    return knex('cloth')
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
  static get(user_id, startTime = 0, endTime = Date.parse('2099-10-01')) {
    return knex('cloth')
      .where('user_id', user_id)
      .andWhere('add_at', '>', startTime)
      .andWhere('add_at', '<', endTime)
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