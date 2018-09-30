const Food = `
  type Food {
    # morning afternoon evening
    foods: [FoodItem]!
    type: String
   }

  type FoodItem {
    id: Int
    code: String
    calory: String
    weight: String
    name: String
    thumb_image_name: String
    is_liquid: Boolean
  }

  type FoodPage {
    page: Int!
    foods: [FoodItem]!
    total_pages: Int
  }

  type FoodEnergy {
    reduce_carbon: Float
    tree: Float
    reduce_calory: Float
  }
`;

module.exports = Food;
