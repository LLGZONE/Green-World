const resolvers = {
  User: {
    bonus(obj, _, context) {
      return context.Bonus.getBonus(obj.userId);
    }
  }
};

module.exports = resolvers;
