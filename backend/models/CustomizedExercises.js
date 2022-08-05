// Model for an CustomizedExercise object
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let customizedExerciseSchema = new Schema(
  {
    userId: {
        type: String,
    },
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
let CustomizedExercise = mongoose.model("CustomizedExercise", customizedExerciseSchema, "CustomizedExercises");

module.exports = CustomizedExercise;