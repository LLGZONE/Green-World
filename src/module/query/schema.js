const RootQuery = `
  type RootQuery {
    user(userId: ID!): User
    bonus(userId: ID!): Bonus
    recycle(userId: ID!): Recycle
    clothLatest(userId: ID!): Cloth
    cloth(
      userId: ID!
      startTime: Int
      endTime: Int
    ): [Cloth]!
    bus(
      userId: ID!
      startTime: Int
      endTime: Int
    ): [Bus]!
    food(
      userId: ID!
      startTime: Int
      endTime: Int
    ): [Food]!
    foodLatest(userId: ID!): Food
    steps(
      userId: ID!
      startTime: Int
      endTime: Int
    ): [Steps]
  }
`

module.exports = RootQuery