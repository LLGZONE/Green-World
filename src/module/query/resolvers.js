const query = {
  RootQuery: {
    user(_, { userId }, context) {
      return context.User.getUser(userId)
    },
    bonus(_, {userId}, context) {
      return context.Bonus.getBonus(userId)
    },
    recycle(_, {userId}, context) {
      return context.Recycle.get(userId)
    },
    cloth(_, {userId, startTime, endTime}, context) {
      return context.Cloth.get(userId, startTime, endTime)
    },
  }
}

module.exports = query