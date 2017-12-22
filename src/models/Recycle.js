const knex = require('../connector')

class Recycle {
  static add(user_id, {
    recycleDate: recycle_date,
    recycleTime: recycle_time,
    reduceBonus: reduce_bonus,
    recyclePlace: recycle_place,
  }) {
    return knex('recycle')
      .returning('id')
      .insert({
        user_id,
        recycle_date,
        recycle_time,
        reduce_bonus,
        recycle_place,
      })
  }

  static get(user_id) {
    return knex('recycle')
      .where({
        user_id
      })
  }

  //更改时间回收或者进行下一次回收
  static update(user_id, {recycle_date, recycle_time}) {
    return knex('recycle')
      .where({user_id})
      .update({recycle_date, recycle_time})
  }
}

module.exports = Recycle