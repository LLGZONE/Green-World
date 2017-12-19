/*
addUser(userId: ID!): User
updateUser(userId: ID!, userInfo: UserInfo): User
addBonusPoints(userId, bonusPoints): Bonus
addRecycle(userId: ID!, recycleInfo: RecycleInfo): Recycle
addSteps(userId: ID!, stepsInfo: StepsInfo): Steps
addBus(userId: ID!, busInfo: BusInfo): Bus
addCloth(userId: ID!, clothInfo: ClothInfo): Cloth
addFood(userId: ID!, foodInfo: FoodInfo): Food
*/
const mutation = {
  Mutation: {
    addUser(_, {userId}, context) {
      return context.User.addUser({userId})
    },
    updateUser(_, {userId, userInfo}, context) {
      return context.User.updateUser(userId, userInfo)
    },
    addBonusPoints(_, {userId, bonusPoints}, context) {
      return context.Bonus.addBonus(userId, points)
    },
    addRecycle(_, {userId, recycleInfo}, context) {
      return context.Recycle.add(userId, recycleInfo)
    },
    addSteps(_, {userId, stepsInfo}, context) {
      return context.Steps.add(userId, stepsInfo)
    },
    addBus(_, {userId, stepsInfo}, context) {
      return context.Bus.add(userId, stepsInfo)
    },
    addCloth(_, {userId, clothInfo}, context) {
      return context.Cloth.add(userId, clothInfo)
    },
    addFood(_, {userId, foodInfo}, context) {
      return context.Food.add(userId, foodInfo)
    }
  }
}

module.exports = mutation