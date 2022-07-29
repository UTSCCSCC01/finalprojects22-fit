const express = require("express");
const ShortTermGoal = require("../models/ShortTermGoal")
const router = express.Router();

// POST - Creates new user in ShortTermGoals Collection
router.post("/", async (req, res) => {
    try {
        let shortTermGoal = new ShortTermGoal(req.body);
        post = await shortTermGoal.save();
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

// GET - Fetch all users from the ShortTermGoals Collection
router.get("/:userId", async (req, res) => {
    try {
        let shortTermGoal = await ShortTermGoal.findOne({
            userId: req.params.userId,
        });
        if(shortTermGoal){
            shortTermGoal = await ShortTermGoal.find({
                userId: req.params.userId,
            });
            res.status(200).json({
                status: 200,
                data: shortTermGoal,
            });
        }else{
            res.status(200).json({
                status: 200,
                data: null,
            });
        }
        
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// DELETE - Delete the set given the id from the Set Collection
router.delete("/:_id", async (req, res) => {
    try {
        let shortTermGoal = await ShortTermGoal.findByIdAndDelete(req.params._id);
        if (shortTermGoal) {
            res.status(200).json({
                status: 200,
                message: "Successfully deleted ",
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "not found"
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