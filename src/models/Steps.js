const knex = require('../connector')

class Steps {
  static add(user_id, {step_date, steps, add_bonus, reduce_carbon}) {
    return knex('steps')
      .insert({
        user_id,
        step_date,
        steps,
        add_bonus,
        reduce_carbon,
      })
  }
  //获得指定时间段的
  static get(user_id, startTime = 0, endTime = Date.parse('2099-10-01')) {
    return knex('steps')
      .where('user_id', user_id)
      .andWhere('add_at', '>', startTime)
      .andWhere('add_at', '<', endTime)
  }

  static getAll(user_id) {
    return knex('steps')
      .where({user_id})
  }

  static update(user_id, info) {
    return knex('steps')
      .where({user_id})
      .update(info)
  }
}

module.exports = Steps