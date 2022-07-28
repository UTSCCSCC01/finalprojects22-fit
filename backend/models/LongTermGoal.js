const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let LongTermGoalSchema = new Schema(
  {
    userId: {
      type: String,
    },
    startingWeight: {
      type: Number, default: null,
    },
    targetWeight: {
      type: Number,
    },
    planId: {
      type: mongoose.ObjectId, default: null,
    }
  }
);

// specify the collection for this model from the DB 
let LongTermGoal = mongoose.model("LongTermGoal", LongTermGoalSchema, "LongTermGoals");

module.exports = LongTermGoal;