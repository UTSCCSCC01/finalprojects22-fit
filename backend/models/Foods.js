//Model for a Food Object
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let foodSchema = new Schema(
  {
    FoodGroup: {
      type: String,
    },
    FoodName: {
      type: String,
    },
    Calorie: {
       type: Number,
    },
    Carbohydrate: {
      type: mongoose.Types.Decimal128,
    },
    Fat: {
      type: mongoose.Types.Decimal128,
    },
    Protein: {
      type: mongoose.Types.Decimal128,
    }
  }
);

// specify the collection for this model from the DB
let Food = mongoose.model("Food", foodSchema, "Foods");

module.exports = Food;