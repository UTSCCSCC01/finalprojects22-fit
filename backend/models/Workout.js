// Model for a Set object
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let workoutScheme = new Schema(
{
  exercises: {
    type: [mongoose.ObjectId],
  }
}
);

// specify the collection for this model from the DB 
let Workout = mongoose.model("Workout", workoutScheme, "Workouts");

module.exports = Workout;
