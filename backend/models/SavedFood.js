//Model for a SavedFood object
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let savedfoodScheme = new Schema(
{
  userId: {
    type: mongoose.ObjectId,
  },
  food_name: {
    type: String,
  },
  calorie: {
      type: Number,
  },
  carbohydrate: {
    type: mongoose.Types.Decimal128,
  },
  fat: {
    type: mongoose.Types.Decimal128,
  },
  protein: {
    type: mongoose.Types.Decimal128,
  },
  date: {
    type: Date,
  }
}
);

// specify the collection for this model from the DB
let SavedFood = mongoose.model("SavedFood", savedfoodScheme, "SavedFoods");

module.exports = SavedFood;