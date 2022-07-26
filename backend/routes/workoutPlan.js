const express = require("express");
const WorkoutPlan = require("../models/WorkoutPlan");
const router = express.Router();

// GET - Fetch the workout plan given a workoutPlanId
router.get("/:planId", async (req, res) => {
    try {
        let workoutPlan = await WorkoutPlan.findOne({
          _id: req.params.planId,
        });
        if (workoutPlan) {
            // user set history is found
            res.status(200).json({
                status: 200,
                data: workoutPlan,
            });
        } else {
            // user set history cannot be found in db
            res.status(400).json({
                status: 400,
                message: "User not found",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    } 
});

// GET - Fetch all shared workout plans
router.get("/", async (req, res) => {
    try {
        let workoutPlan = await WorkoutPlan.find({
            shared_plan: true,
        });
        if (workoutPlan) {
            // user set history is found
            res.status(200).json({
                status: 200,
                data: workoutPlan,
            });
        } else {
            // user set history cannot be found in db
            res.status(400).json({
                status: 400,
                message: "User not found",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    } 
});

// POST - Creates new object in the workout plan Collection
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

// PATCH - patch existing object in the workout plan Collection
router.patch("/:workoutPlanId", async (req, res) => {
    try {
        let workoutPlan = await WorkoutPlan.findByIdAndUpdate(req.params.workoutPlanId, req.body, {
            new: true,
        });
        if (workoutPlan) {
            res.status(200).json({
                status: 200,
                data: workoutPlan,
            });
        } else {
            res.status(400).json({
                status: 400, 
                message: "workoutPlan not found/Update cannot be done",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// DELETE - Delete the set given the id from the workout plan Collection
router.delete("/:workoutPlanId", async (req, res) => {
    try {
        let workoutPlan = await WorkoutPlan.findByIdAndRemove(req.params.workoutPlanId);
        if (workoutPlan) {
            res.status(200).json({
                status: 200,
                message: "Successfully deleted workout plan",
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "Workout plan cannot be deleted/plan not found"
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

module.exports = router;
