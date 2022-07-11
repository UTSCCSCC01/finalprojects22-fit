// Model for a Set object
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let workoutPlanScheme = new Schema(
{
  userId: {
    type: mongoose.ObjectId,
  },
  workout_length: {
    type: Number,
  },
  workout_counter: {
    type: Number,
  },
  workouts: {
    type: [[mongoose.ObjectId]],
  }
}
);

// specify the collection for this model from the DB 
let WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanScheme, "WorkoutPlans");

module.exports = WorkoutPlan;