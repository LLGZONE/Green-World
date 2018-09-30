const Bonus = require('../bonus/schema');
const Cloth = require('../cloth/schema');
const Food = require('../food/schema');
const Bus = require('../bus/schema');
const Steps = require('../steps/schema');

const User = `
  type User {
    id: ID!
    userId: ID
    name: String
    phone: String
    dorm: String
    bonus: Bonus
    college: String
    studentId: String
  }
`;

module.exports = [User, Bonus, Steps, Food, Cloth, Bus];
