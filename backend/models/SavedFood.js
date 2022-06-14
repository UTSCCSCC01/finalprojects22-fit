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
  carbohydrate: {
    type: Number,
  },
  fat: {
    type: Number,
  },
  protein: {
    type: Number,
  }
  date: {
    type: Date,
  }
}
);

// specify the collection for this model from the DB
let SavedFood = mongoose.model("SavedFood", savedfoodSchemeScheme, "SavedFoods");

module.exports = SavedFood;