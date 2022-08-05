// Model for a short term goal object
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const shortTermGoalSchema = new Schema({
  description: {
    type: String,
  },
  xp: {
    type: Number,
  },
  userId: {
    type: String,
  }
  
},
{ timestamps: true });


// specify the collection for this model from the DB 
let ShortTermGoal = mongoose.model("ShortTermGoal", shortTermGoalSchema, "ShortTermGoals");

module.exports = ShortTermGoal;
