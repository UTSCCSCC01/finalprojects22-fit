const express = require("express");
const SavedFood = require("../models/SavedFood");
const router = express.Router();

// POST - Creates new object in the Set Collection
router.post("/", async (req, res) => {
    try {
        let savedfood = new SavedFood(req.body);
        post = await set.save();
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

// GET - Fetch the SavedFoods given a userId
router.get("/:userId", async (req, res) => {
    try {
        let savedfood = await SavedFood.find({
          userId: req.params.userId,
        });
        if (set) {
            res.status(200).json({
                status: 200,
                data: savedfood,
            });
        } else {
            // user saved foods history cannot be found in db
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

// PATCH - Update the set given the id from the Set Collection
router.patch("/:setId", async (req, res) => {
    try {
        let savedfood = await SavedFood.findByIdAndUpdate(req.params.setId, req.body, {
            new: true,
        });
        if (savedfood) {
            res.status(200).json({
                status: 200,
                data: savedfood,
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "SavedFood not found/Update cannot be done",
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
router.delete("/:setId", async (req, res) => {
    try {
        let savedfood = await SavedFood.findByIdAndRemove(req.params.setId);
        if (savedfood) {
            res.status(200).json({
                status: 200,
                message: "Successfully deleted saved food",
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "Saved food cannot be deleted/Saved food not found"
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