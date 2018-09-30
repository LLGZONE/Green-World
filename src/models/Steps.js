const knex = require('../connector');
const WXBizDataCrypt = require('../libs/utils/WXBizDataCrypt');
const getDate = require('../libs/utils/getDate');
const { appId } = require('../libs/secrets');
const Bonus = require('./Bonus');

class Steps {
  static async add(user_id, { date, encryptedData, iv }) {
    const yDate = getDate(new Date(date).getTime() / 1000 - 3600);
    const [dateStep] = await knex('steps').where({ user_id, date: yDate });
    if (!dateStep) {
      const [{ session_key: sessionKey }] = await knex('users')
        .where({ uid: user_id })
        .select('session_key');
      const pc = new WXBizDataCrypt(appId, sessionKey);
      const data = pc.decryptData(encryptedData, iv);
      data.stepInfoList.pop();
      const yesterday = data.stepInfoList.pop();
      const steps = yesterday.step;
      const rest = Math.floor((steps - 10000) / 5000);
      let add_bonus = 0;
      if (rest > 0) {
        add_bonus = rest;
      }

      let reduce_carbon = (((steps * 0.5) / 1000) * 150) / 2;
      Bonus.addBonus(user_id, add_bonus);
      return knex('steps')
        .returning('*')
        .insert({
          user_id,
          date: getDate(yesterday.timestamp),
          steps,
          reduce_carbon,
          add_bonus
        });
    } else {
      return Promise.resolve([dateStep]);
    }
  }

  static getAll(user_id) {
    return knex('steps').where({ user_id });
  }

  static update(user_id, info) {
    return knex('steps')
      .where({ user_id })
      .update(info);
  }
}

module.exports = Steps;
