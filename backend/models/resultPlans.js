const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let resultPlanSchema = new Schema(
    {
        Result:{
            type: String,
        },
        Plan:{
            type: String,
        }
    }
);

let ResultPlan = mongoose.model("ResultPlan", resultPlanSchema, "ResultPlans");

module.exports = ResultPlan;