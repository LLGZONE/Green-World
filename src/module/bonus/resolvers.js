const resolvers = {
  Bonus: {
    user(obj, _, context) {
      return context.User.getUser(obj.userId)
    }
  }
}

module.exports = resolvers