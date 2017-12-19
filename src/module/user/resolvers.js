const resolvers = {
  User: {
    bonus(obj, _, context) {
      return context.Bonus.getBonus(obj.userId)
    },
    cloth(obj, _, context) {
      return context.Cloth.get(obj.userId)
    },
    food(obj, _, context) {
      return context.Food.get(obj.userId)
    },
    steps(obj, _, context) {
      return context.Steps.get(obj.userId)
    },
    bus(obj, _, context) {
      return context.Bus.get(obj.userId)
    }
  }
}

module.exports = resolvers