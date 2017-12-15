const knex = require('../connector')

class Cloth {
  add(user_id, {type, add_at, num}) {
    return knex('cloth')
      .insert()
  }
}

module.exports = Cloth