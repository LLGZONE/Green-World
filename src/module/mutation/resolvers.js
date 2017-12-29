const getFileDir = require('../../libs/utils/getFileDir')
const base64ToImageFile = require('../../libs/utils/base64')

const mutation = {
  Mutation: {
    addUser(_, {userId}, context) {
      return context.User.addUser({userId}).then((id) => ({id}))
    },
    updateUser(_, {userId, userInfo}, context) {
      return context.User.updateUser(userId, userInfo).then(([id]) => ({id}))
    },
    addBonusPoints(_, {userId, bonusPoints}, context) {
      return context.Bonus.addBonus(userId, bonusPoints)
        .then(([id]) => ({id}))
    },
    addRecycle(_, {userId, recycleInfo}, context) {
      return context.Recycle.add(userId, recycleInfo)
        .then(([id]) => ({id}))
    },
    addSteps(_, {userId, stepsInfo}, context) {
      return context.Steps.add(userId, stepsInfo)
        .then(([id]) => ({id}))
    },
    addBus(_, {userId, busInfo}, context) {
      const fileDir = getFileDir(userId, 'bus')
      busInfo.img_dir = base64ToImageFile(busInfo.imgBase64, fileDir)

      return context.Bus.add(userId, busInfo)
        .then(([id]) => ({id}))
    },
    addCloth(_, {userId, clothInfo}, context) {
      const fileDir = getFileDir(userId, 'cloth')
      clothInfo.img_dir = base64ToImageFile(clothInfo.imgBase64, fileDir)

      return context.Cloth.add(userId, clothInfo)
        .then(([id]) => ({id}))
    },
    addFood(_, {userId, foodInfo}, context) {
      const fileDir = getFileDir(userId, 'bus')
      foodInfo.img_dir = base64ToImageFile(foodInfo.imgBase64, fileDir)

      return context.Food.add(userId, foodInfo)
        .then(([id]) => ({id}))
    },
  }
}

module.exports = mutation