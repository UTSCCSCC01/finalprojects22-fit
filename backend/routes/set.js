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

module.exports = router;
