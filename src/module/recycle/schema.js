const Recycle = `
  enum TimeRange {
    MORNING
    AFTERNOON
    NIGHT
  }
  
  type Recycle {
    id: Int!
    recycleDate: String!
    recycleTime: TimeRange!
    reducedBonus: Float
  }
`

module.exports = Recycle