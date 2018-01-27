const Mutation = `
  input UserId {
    # 微信 getUserInfo 返回
    iv: String!
    encryptedData: String!
    signature: String
    sessionKey: String
  }
  
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
    # 若用户已存在，则返回的 errors[0].message 为 'user exists'
    addUser(encrypt: UserId): User
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