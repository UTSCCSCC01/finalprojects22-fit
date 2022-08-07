const express = require("express");
const User = require("../models/User");
const router = express.Router();
const upload = require("../middleware/upload");

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

// GET - Fetch list of body metric records of the user given the id
router.get("/:userId/bmetric", async (req, res) => {
    try {
        let user = await User.findOne({
            _id: req.params.userId,
        });
        if (user) {
            // user is found
            res.status(200).json({
                status: 200,
                data: user.body_metrics,
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

// GET - Fetch users based on a string that is in user's display name/ first name/ last name/ username from the Users Collection
router.get("/search/:query", async (req, res) => {
    try {
        let user = await User.find({
            "$or" :[
                {"display_name": new RegExp(req.params.query, 'i')},
                {"username": new RegExp(req.params.query, 'i')}
            ]}, 
            { "_id": 1, "display_name": 1, "username": 1 }
        );
        if (user) {
            // user is found
            res.status(200).json({
                status: 200,
                data: user,
            });
        } else {
            // user cannot be found in db
            res.status(404).json({
                status: 404,
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

// PUT - Update the user's profile pic uri given the id from the Users Collection
router.put("/:userId/img", upload.single("file"), async (req, res) => {
    try {
        const imgUrl = `http://localhost:3000/file/${req.file.filename}`;
        let user = await User.findByIdAndUpdate(
            { _id: req.params.userId},
            { $set: {
                "profile_pic": imgUrl
            } },
            { new: true },
        );
        if (user) {
            res.status(200).json({
                status: 200,
                data: user,
            });
        } else {
            res.status(400).json({
                status: 400, 
                message: "User not found/Update cannot be done"
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// GET - Fetch list of body metric records of the user given the id
router.get("/:userId/workoutPlan", async (req, res) => {
    try {
        let user = await User.findOne({
            _id: req.params.userId,
        });
        if (user) {
            // user is found
            res.status(200).json({
                status: 200,
                data: user.workout_plan,
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

// PUT - Update the user with an additional friend appended
router.put("/:userId/friend/:fId", async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.userId, 
            { $push: { friends: req.params.fId } }, 
            { new : true });
        if (user) {
            res.status(200).json({
                status: 200,
                data: user,
            });
        } else {
            res.status(404).json({
                status: 404, 
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

// PUT - Update the user given the id from the Users Collection
//       by appending a new body_metrics record
router.put("/:userId/bmetric", async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(
            req.params.userId,
            { $push: { body_metrics: req.body } },
            { new: true },
        );
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

// PUT - Update the user given the id from the Users Collection
//       by updating a body_metrics record with bid
router.put("/:userId/bmetric/:bid", async (req, res) => {
    try {
        let user = await User.findOneAndUpdate(
            { _id: req.params.userId, "body_metrics._id": req.params.bid },
            { $set: {
                "body_metrics.$.value": req.body.value
            } },
            { new: true },
        );
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

// PATCH - Update the user given the id from the Users Collection
//       by updating their workout plan info
router.patch("/:userId", async (req, res) => {
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
