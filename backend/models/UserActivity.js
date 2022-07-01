// Model for a UserActivity object
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userActivityScheme = new Schema(
{
  userId: {
    type: mongoose.ObjectId,
  },
  exercise_activity: {
    type: Boolean, default: false,
  },
  food_activity: {
    type: Boolean, default: false,
  },
  body_activity: {
    type: Boolean, default: false,
  },
  date: {
    type: Date,
  }
}
);

// specify the collection for this model from the DB 
let UserActivity = mongoose.model("UserActivity", userActivityScheme, "UserActivity");

module.exports = UserActivity;
