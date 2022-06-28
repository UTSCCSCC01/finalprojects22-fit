// Model for a User object
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const bodymetrics = new Schema({
  metric: {
    type: String,
  },
  unit: {
    type: String,
  },
  value: {
    type: Number,
  },
  date: {
    type: String,
  }
});

let userSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    display_name: {
      type: String,
    },
    xp: {
      type: Number,
    },
    body_metrics: {
      type: [bodymetrics],
    }
  },
  { timestamps: true }
);

// specify the collection for this model from the DB 
let User = mongoose.model("User", userSchema, "Users");

module.exports = User;
