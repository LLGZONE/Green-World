const knex = require('../connector');
const foods = require('../libs/food.json');
const Bonus = require('./Bonus');

class Food {
  static async get(user_id, type, date) {
    const [food] = await knex('food').where({ date, user_id, type });
    if (food) {
      let foodsCd = JSON.parse(food.foods_code);
      let foodsCode = foodsCd.map(code => code.split(':')[0]);
      const res = [];
      foods.forEach(f => {
        let newFoods = f.foods.filter(fo => foodsCode.includes(fo.code));
        newFoods = newFoods.map(f => {
          for (let i = 0; i < foodsCd.length; i++) {
            if (foodsCd[i].startsWith(f.code)) {
              let newF = JSON.parse(JSON.stringify(f));
              newF.code = foodsCd[i];
              return newF;
            }
          }
        });

        res.push(...newFoods);
      });
      return { type, foods: res };
    } else {
      console.log('no food');
      return { type, foods: [] };
    }
  }

  // 6000千卡相当于3000gCO2也就是2:1的关系
  static async getEnergy(user_id, date) {
    const food = await knex('food').where({ date, user_id });
    let reduce_calory = 0;
    let reduce_carbon = 0;
    let tree = 0;

    if (food.length > 0) {
      food.forEach(f => {
        if (800 - f.calory > 0 && f.type !== 'addmeal') {
          reduce_calory += 800 - f.calory;
        }
      });
      // 以克作为单位
      reduce_carbon = reduce_calory / 2;
      tree = reduce_carbon / 5000;
      return {
        reduce_carbon,
        reduce_calory,
        tree
      };
    } else {
      return {
        reduce_carbon: 0,
        reduce_calory: 0,
        tree: 0
      };
    }
  }

  static async add(user_id, { type, date, foodsCode, calory }) {
    const [food] = await knex('food').where({ date, user_id, type });
    if (!food) {
      if (500 < calory && calory < 800 && type !== 'addmeal') {
        Bonus.addBonus(user_id, 0.5);
      }
      return knex('food')
        .returning('id')
        .insert({
          user_id,
          date,
          type,
          foods_code: JSON.stringify(foodsCode),
          calory
        });
    } else {
      return knex('food')
        .returning('id')
        .where({ user_id, type, date })
        .update({
          foods_code: JSON.stringify(foodsCode)
        });
    }
  }

  //用于误上传时操作
  static update(user_id, id, info) {
    return knex('food')
      .where({ user_id, id })
      .update(info);
  }

  static page(p) {
    return foods.filter(food => {
      return food.page === p;
    })[0];
  }

  static foodSearch(name) {
    const res = [];
    foods.forEach(f => {
      res.push(
        ...f.foods.filter(food => {
          return food.name.includes(name);
        })
      );
    });
    return res;
  }
}

module.exports = Food;
