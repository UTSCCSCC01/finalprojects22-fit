// Model for an Exercise object
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let exerciseSchema = new Schema(
  {
    MuscleGroup: {
      type: String,
    },
    ExerciseName: {
      type: String,
    },
    NeedsGym: {
      type: String,
    }
  }
);

// specify the collection for this model from the DB 
let Exercise = mongoose.model("Exercise", exerciseSchema, "Exercises");

module.exports = Exercise;
