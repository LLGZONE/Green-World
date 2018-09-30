const garbages = require('../../libs/garbage.json');

const query = {
  RootQuery: {
    user(_, { userId }, context) {
      return context.User.getUser(userId);
    },
    bonus(_, { userId }, context) {
      return context.Bonus.getBonus(userId);
    },
    bonusDescription(_, {}, context) {
      return {
        text:
          '步数规则: 10000步以上时，每5000步积分加1分，不足时不加分。\n上门回收时: 1个塑料瓶=0.5积分，1公斤纸制品=6积分\n饮食积分计算规则: 根据饮食比例进行计算。\n每天摄入卡路里在1500-2000千卡之间，早中晚按照3:4:3划分，每餐每节省100千卡加0.5分，每餐最低摄取量不能低于推荐值，当天摄取量超过推荐值200千卡时，当日积分归0'
      };
    },
    recycle(_, { userId }, context) {
      return context.Recycle.get(userId)
        .then(row => row[0])
        .then(
          ({
            user_id: id,
            recycle_date: recycleDate,
            recycle_time: recycleTime,
            reduce_bonus: reducedBonus,
            recycle_place: recyclePlace
          }) => ({
            id,
            recycleDate,
            recycleTime,
            reducedBonus,
            recyclePlace
          })
        );
    },
    cloth(_, { userId, startTime, endTime }, context) {
      return context.Cloth.get(userId, startTime, endTime);
    },
    bus(_, { userId, startTime, endTime }, context) {
      return context.Bus.get(userId, startTime, endTime);
    },
    foodPage(_, { page }, context) {
      return context.Food.page(page);
    },
    food(_, { userId, type, date }, context) {
      return context.Food.get(userId, type, date);
    },
    foodEnergy(_, { userId, date }, context) {
      return context.Food.getEnergy(userId, date);
    },
    foodSearch(_, { name }, context) {
      return context.Food.foodSearch(name);
    },
    garbage(_, { name }) {
      return garbages.filter(g => {
        return g.name.includes(name);
      });
    }
  }
};

module.exports = query;
