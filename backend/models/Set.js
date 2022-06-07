// Model for a Set object
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let setScheme = new Schema(
{
  userId: {
    type: mongoose.ObjectId,
  },
  exercise_name: {
    type: String,
  },
  is_cardio: {
    type: Boolean,
  },
  first_value: {
    type: Number,
  },
  second_value: {
    type: Number,
  },
  date: {
    type: Date,
  }
}
);

// specify the collection for this model from the DB 
let Set = mongoose.model("Set", setScheme, "Sets");

module.exports = Set;
