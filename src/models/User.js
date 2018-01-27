const knex = require('../connector')
const Bonus = require('./Bonus')
const WXBizDataCrypt = require('../libs/utils/WXBizDataCrypt')
const { appId } = require('../libs/secrets')

class User {
  static getUser(uid) {
    return knex('users')
      .where({
        uid
      })
      .then(row => row[0])
  }

  static async addUser({iv, encryptedData, signature, sessionKey}) {
    const pc = new WXBizDataCrypt(appId, sessionKey)
    const data = pc.decryptData(encryptedData , iv)

    const { openId, gender } = data
    try {
      const [id] = await knex('users')
        .returning('id')
        .insert({uid: openId, gender})
      await Bonus.init(openId)
    } catch (e) {
      throw new Error('user exits')
    }
    return id
  }

  static updateUser(uid, info) {
    return knex('users')
      .returning('id')
      .where({
        uid,
      })
      .update(info)
  }
}

module.exports = User