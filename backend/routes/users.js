const express = require("express");
const User = require("../models/User");
const router = express.Router();

// POST - Creates new user in Users Collection
router.post("/", async (req, res) => {
    try {
        let user = new User(req.body);
        post = await user.save();
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

// GET - Fetch all users from the Users Collection
router.get("/list", async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json({
            status: 200,
            data: users,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// GET - Fetch the user given the id from the Users Collection
router.get("/:userId", async (req, res) => {
    try {
        let user = await User.findOne({
            _id: req.params.userId,
        });
        if (user) {
            // user is found
            res.status(200).json({
                status: 200,
                data: user,
            });
        } else {
            // user cannot be found in db
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

// PUT - Update the user given the id from the Users Collection
router.put("/:userId", async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
        });
        if (user) {
            res.status(200).json({
                status: 200,
                data: user,
            });
        } else {
            res.status(400).json({
                status: 400, 
                message: "User not found/Update cannot be done",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// DELETE - Delete the user given the id from the Users Collection
router.delete("/:userId", async (req, res) => {
    try {
        let user = await User.findByIdAndRemove(req.params.userId);
        if (user) {
            res.status(200).json({
                status: 200,
                message: "Successfully deleted user",
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "User cannot be deleted/User not found"
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
