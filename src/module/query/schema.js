const RootQuery = `
  type RootQuery {
    user(userId: String!): User
    bonus(userId: String!): Bonus
    recycle(userId: String!): Recycle
    clothLatest(userId: String!): Cloth
    cloth(
      userId: String!
      startTime: Int
      endTime: Int
    ): [Cloth]!
    bus(
      userId: String!
      startTime: Int
      endTime: Int
    ): [Bus]!
    food(
      userId: String!
      startTime: Int
      endTime: Int
    ): [Food]!
    foodLatest(userId: String!): Food
    steps(
      userId: String!
      startTime: Int
      endTime: Int
    ): [Steps]
  }
`

module.exports = RootQuery