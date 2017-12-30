const Mutation = `
  input UserInfo {
    name: String
    qq: String
    phone: String
    dorm: String
  }
  
  input RecycleInfo {
    recycleDate: String
    recycleTime: TimeRange
    recyclePlace: String
    reduceBonus: Float
  }
  
  input StepsInfo {
    steps: Int
    stepDate: String
    addedBonus: Float
    reducedCarbon: Int
  }
  
  input BusInfo {
    addedAt: String
    addedBonus: Float
    imgBase64: [String]!
  }
  
  input ClothInfo {
    type: String
    num: Int
    addedBonus: Float
    addedAt: String
    imgBase64: [String]!
  }
  
  input FoodInfo {
    hun: Int
    su: Int
    addedAt: String
    addedBonus: Float
    imgBase64: [String]!
  }
  
  type Mutation {
    addUser(userId: ID!): User
    updateUser(userId: ID!, userInfo: UserInfo): User
    addBonusPoints(userId: ID!, bonusPoints: Float): Bonus
    addRecycle(userId: ID!, recycleInfo: RecycleInfo): Recycle
    addSteps(userId: ID!, stepsInfo: StepsInfo): Steps
    addBus(userId: ID!, busInfo: BusInfo): Bus
    addCloth(userId: ID!, clothInfo: ClothInfo): Cloth
    addFood(userId: ID!, foodInfo: FoodInfo): Food
  }
`

module.exports = Mutation