const express = require("express");
const WorkoutPlan = require("../models/WorkoutPlan");
const router = express.Router();

// POST - Creates new object in the Set Collection
router.post("/", async (req, res) => {
    try {
        let workoutPlan = new WorkoutPlan(req.body);
        post = await workoutPlan.save();
        res.status(200).json({
            status: 200,
            data: post,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

module.exports = router;
