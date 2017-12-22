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
    stepDate: Int
    addedBonus: Float
    reducedCarbon: Int
  }
  
  input BusInfo {
    addedAt: Int
    addedBonus: Int
  }
  
  input ClothInfo {
    type: String
    num: Int
    addedBonus: Float
    addedAt: Int
  }
  
  input FoodInfo {
    hun: Int
    su: Int
    addedAt: Int
    addedBonus: Float
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