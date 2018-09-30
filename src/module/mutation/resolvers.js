const getFileDir = require('../../libs/utils/getFileDir');
const base64ToImageFile = require('../../libs/utils/base64');

const mutation = {
  Mutation: {
    addUser(_, { encrypt }, context) {
      return context.User.addUser(encrypt).then(id => ({ userId: id }));
    },
    updateUser(_, { userId, userInfo }, context) {
      return context.User.updateUser(userId, userInfo).then(([uid]) => ({
        userId: uid
      }));
    },
    addBonusPoints(_, { userId, bonusPoints }, context) {
      return context.Bonus.addBonus(userId, bonusPoints).then(([id]) => ({
        id
      }));
    },
    addRecycle(_, { userId, recycleInfo }, context) {
      return context.Recycle.add(userId, recycleInfo).then(([id]) => ({ id }));
    },
    addSteps(_, { userId, stepsInfo }, context) {
      return context.Steps.add(userId, stepsInfo).then(
        ([{ user_id, date, reduce_carbon, add_bonus, steps }]) => ({
          userId: user_id,
          date,
          reduceCarbon: reduce_carbon,
          addBonus: add_bonus,
          steps
        })
      );
    },
    addCloth(_, { userId, clothInfo }, context) {
      const fileDir = getFileDir(userId, 'cloth');

      clothInfo.img_dir = clothInfo.imgBase64
        .map(base64 => base64ToImageFile(base64, fileDir))
        .join('&&');

      return context.Cloth.add(userId, clothInfo).then(([id]) => ({ id }));
    },
    addFood(_, { userId, foodInfo }, context) {
      return context.Food.add(userId, foodInfo).then(([id]) => id);
    }
  }
};

module.exports = mutation;
