const Bonus = require('../bonus/schema')
const Cloth = require('../cloth/schema')
const Food = require('../food/schema')
const Bus = require('../bus/schema')
const Steps = require('../steps/schema')

const User = `
  type User {
    id: ID!
    userId: String
    name: String
    phone: String
    qq: String
    dorm: String
    bonus: Bonus
    cloth: [Cloth]
    food: [Food]
    bus: [Bus]
    steps: [Steps]
  }
`

module.exports = [User, Bonus, Steps, Food, Cloth, Bus]