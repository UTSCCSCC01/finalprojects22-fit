const express = require("express");
const Set = require("../models/Set");
const router = express.Router();

// POST - Creates new object in the Set Collection
router.post("/", async (req, res) => {
    try {
        let set = new Set(req.body);
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

// GET - Fetch the Sets given a userId
router.get("/:userId", async (req, res) => {
    try {
        let set = await Set.find({
          userId: req.params.userId,
        });
        if (set) {
            // user set history is found
            res.status(200).json({
                status: 200,
                data: set,
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


// GET - Fetch the Sets given a userId and date
router.get("/:userId/:date", async (req, res) => {
    try {
        let set = await Set.find({
          userId: req.params.userId,
          date:{
            $gte: new Date(req.params.date).setHours(0,0,0,0), 
            $lt: new Date(req.params.date).setHours(24,0,0,0),
        }
        });
        if (set) {
            // user set history is found
            res.status(200).json({
                status: 200,
                data: set,
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

// PATCH - Update the set given the id from the Set Collection
router.patch("/:setId", async (req, res) => {
    try {
        let set = await Set.findByIdAndUpdate(req.params.setId, req.body, {
            new: true,
        });
        if (set) {
            res.status(200).json({
                status: 200,
                data: set,
            });
        } else {
            res.status(400).json({
                status: 400, 
                message: "Set not found/Update cannot be done",
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
        let set = await Set.findByIdAndRemove(req.params.setId);
        if (set) {
            res.status(200).json({
                status: 200,
                message: "Successfully deleted set",
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "Set cannot be deleted/Set not found"
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
