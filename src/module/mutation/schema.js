const Mutation = `
  input UserId {
    # wx.login() 调用成功回调函数得到
    code: String!
  }
  
  input UserInfo {
    name: String
    studentId: String
    phone: String
    dorm: String
    # 院系
    college: String
  }
  
  input RecycleInfo {
    recycleDate: String
    recycleTime: String
    recyclePlace: String
  }
  
  input StepsInfo {
    date: String
    encryptedData: String
    iv: String
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
    type: String
    date: String
    foodsCode: [String]!
    calory: Float!
  }
  
  type Mutation {
    addUser(encrypt: UserId): User
    updateUser(userId: ID!, userInfo: UserInfo): User
    addBonusPoints(userId: ID!, bonusPoints: Float): Bonus
    addRecycle(userId: ID!, recycleInfo: RecycleInfo): Recycle
    addSteps(userId: ID!, stepsInfo: StepsInfo): Steps
    addBus(userId: ID!, busInfo: BusInfo): Bus
    addCloth(userId: ID!, clothInfo: ClothInfo): Cloth
    addFood(userId: ID!, foodInfo: FoodInfo): ID!
  }
`;

module.exports = Mutation;
