const knex = require('../connector');
const Bonus = require('./Bonus');
const WXBizDataCrypt = require('../libs/utils/WXBizDataCrypt');
const { appId, sk } = require('../libs/secrets');
const axios = require('axios');

class User {
  static async getUser(uid) {
    return knex('users')
      .where({
        uid
      })
      .then(row => {
        const { uid: userId, student_id: studentId, ...rest } = row[0];
        return { userId, studentId, ...rest };
      });
  }

  static async addUser({ code }) {
    let id = 0;
    const { data } = await axios.get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${sk}&js_code=${code}&grant_type=authorization_code`
    );
    console.log(data);
    const { openid: openId, session_key: sessionKey } = data;
    id = openId;
    try {
      const [user] = await knex('users').where({ uid: openId });
      if (!user || !user.uid) {
        const [uid] = await knex('users')
          .returning('uid')
          .insert({ uid: openId, session_key: sessionKey });
        await Bonus.init(openId);
      } else {
        id = uid;
      }
    } catch (e) {
      console.log(e);
      if (data.errcode) {
        return;
      } else {
        await knex('users')
          .where({
            uid: openId
          })
          .update({ session_key: sessionKey });
      }
    }
    console.log('id', id, openId);
    return id;
  }

  static async user({ iv, encryptedData, signature, sessionKey }) {
    const pc = new WXBizDataCrypt(appId, sessionKey);
    const data = pc.decryptData(encryptedData, iv);

    const { openId, gender } = data;

    try {
      const [uid] = await knex('users')
        .returning('uid')
        .insert({ uid: openId, gender });
      await Bonus.init(openId);
    } catch (e) {
      throw new Error('user exits');
    }
    return uid;
  }

  static updateUser(uid, { phone, dorm, college, studentId, name }) {
    return knex('users')
      .returning('uid')
      .where({
        uid
      })
      .update({ phone, dorm, college, student_id: studentId, name });
  }
}

module.exports = User;
