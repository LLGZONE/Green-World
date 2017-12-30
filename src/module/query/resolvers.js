const query = {
  RootQuery: {
    user(_, {userId}, context) {
      return context.User.getUser(userId)
    },
    bonus(_, {userId}, context) {
      return context.Bonus.getBonus(userId)
    },
    recycle(_, {userId}, context) {
      return context.Recycle.get(userId)
        .then(row => row[0])
        .then(({
                 user_id: id,
                 recycle_date: recycleDate,
                 recycle_time: recycleTime,
                 reduce_bonus: reducedBonus,
                 recycle_place: recyclePlace,
               }) => ({
          id,
          recycleDate,
          recycleTime,
          reducedBonus,
          recyclePlace,
        }))
    },
    cloth(_, {userId, startTime, endTime}, context) {
      return context.Cloth.get(userId, startTime, endTime)
    },
    bus(_, {userId, startTime, endTime}, context) {
      return context.Bus.get(userId, startTime, endTime)
    }
  },
}

module.exports = query