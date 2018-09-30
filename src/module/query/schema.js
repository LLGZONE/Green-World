const RootQuery = `
  type RootQuery {
    user(userId: ID!): User
    bonus(userId: ID!): Bonus
    bonusDescription: BonusDescription
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
      type: String
      date: String
    ): Food!
    foodEnergy(
      userId: ID!
      date: String
    ): FoodEnergy
    foodPage(
      page: Int!
    ): FoodPage
    foodSearch(name: String!): [FoodItem]!
    garbage(name: String): [Garbage]!
    foodLatest(userId: ID!): Food
    steps(
      userId: ID!
      startTime: Int
      endTime: Int
    ): [Steps]
  }
`;

module.exports = RootQuery;
