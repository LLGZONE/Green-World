const Recycle = `
  enum TimeRange {
    MORNING
    AFTERNOON
    NIGHT
  }
  
  type Recycle {
    id: ID!
    recycleDate: String!
    recycleTime: TimeRange!
    reducedBonus: Float
  }
`

module.exports = Recycle