const User = `
  type User {
    id: ID!
    name: String!
    phone: String!
    qq: String!
    dorm: String!
    bonus: Bonus
    cloths: [Cloth]
    food: [Food]
    bus: [Bus]
  }
`

export default user