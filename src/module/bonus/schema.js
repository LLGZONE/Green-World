const Bonus = `
  type Bonus {
    id: Int!
    user: User
    points: Float
  }

  type BonusDescription {
    text: String!
  }
`;

module.exports = Bonus;
