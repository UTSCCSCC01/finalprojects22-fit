const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PlanSchema = new Schema(
    {
        planId: {
            type: String,
        },
        
        planContent:{
            type: String,
        }
    }
);

let Plan = mongoose.model("Plan", PlanSchema, "Plans");

module.exports = Plan;