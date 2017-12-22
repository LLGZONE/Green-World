const knex = require('../connector')

class Food {
  static add(user_id, {hun, su, add_bonus, img_dir}) {
    return knex('food')
      .returning('id')
      .insert({
        user_id,
        hun,
        su,
        add_bonus,
        img_dir
      })
  }

  static get(user_id, startTime = "1970/1/1", endTime = "2099/10/01") {
    return knex('food')
      .where('user_id', user_id)
      .andWhere('add_at', '>', startTime)
      .andWhere('add_at', '<', endTime)
  }

  static getLatest(user_id) {
    return knex('cloth')
      .where({user_id})
      .orderBy('add_at', 'desc')
      .first()
  }

  static getOne(user_id, add_at) {
    return knex('cloth')
      .where({
        user_id,
        add_at,
      })
      .first()
  }

  //用于误上传时操作
  static update(user_id, add_at, info) {
    return knex('food')
      .where({user_id, add_at})
      .update(info)
  }
}

module.exports = Food