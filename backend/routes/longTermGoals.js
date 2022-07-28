const express = require("express");
const LongTermGoal = require("../models/LongTermGoal.js");
const router = express.Router();

// POST - Creates new goal
router.post("/", async (req, res) => {
    try {
        let weightGoal = new LongTermGoal(req.body);
        post = await weightGoal.save();
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

// DELETE - Delete goal given goalId
router.delete("/:goalId", async (req, res) => {
    try {
        let goal = await LongTermGoal.findByIdAndRemove(req.params.goalId);
        if (goal) {
            res.status(200).json({
                status: 200,
                message: "Successfully deleted goal",
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "goal cannot be deleted/plan not found"
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});


// GET - Fetch user's goal given the userId
router.get("/:userId", async (req, res) => {
    try {
        let weightGoal = await LongTermGoal.findOne({
            userId: req.params.userId,
        });
        if (weightGoal) {
            // weightGoal is found
            res.status(200).json({
                status: 200,
                data: weightGoal,
            });
        } else {
            // weightGoal cannot be found in db
            res.status(400).json({
                status: 400,
                message: "weightGoal not found",
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
