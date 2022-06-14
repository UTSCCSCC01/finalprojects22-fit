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
    Carbohydrate: {
      type: Number,
    },
    Fat: {
      type: Number,
    },
    Protein: {
      type: Number,
    }
  }
);

// specify the collection for this model from the DB
let Food = mongoose.model("Food", foodSchema, "Foods");

module.exports = Food;