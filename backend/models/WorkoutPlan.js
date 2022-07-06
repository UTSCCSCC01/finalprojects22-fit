// Model for a Set object
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let workoutPlanScheme = new Schema(
{
  workout_length: {
    type: Number,
  },
  workouts: {
    type: [mongoose.ObjectId],
  }
}
);

// specify the collection for this model from the DB 
let workoutPlan = mongoose.model("workoutPlan", workoutPlanScheme, "workoutPlans");

module.exports = workoutPlan;
