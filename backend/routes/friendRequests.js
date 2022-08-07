const express = require("express");
const fRequest = require("../models/FriendRequest");
const router = express.Router();

// POST - Creates new record in Friend Request Collection
router.post("/", async (req, res) => {
    try {
        let fReq = new fRequest(req.body);
        post = await fReq.save();
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

// GET - Fetch all friend requests that are sent to userid in Friend Request Collection
router.get("/list/:userid", async (req, res) => {
    try {
        let freq = await fRequest.find({
            "to_user": req.params.userid 
        });
        if (freq.length !== 0) {
            res.status(200).json({
                status: 200,
                data: freq,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "No Friend Requests found",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// GET - Fetch a friend request that is sent to userid2 from userid1 in Friend Request Collection
router.get("/list/:userid1/:userid2", async (req, res) => {
    try {
        let freq = await fRequest.findOne({
            "$and" :[
                {"from_user": req.params.userid1},
                {"to_user": req.params.userid2}
            ]} 
        );
        if (freq) {
            res.status(200).json({
                status: 200,
                data: freq,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "No Friend Requests found"
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// DELETE - Delete the friend request given the id from the Friend Request Collection
router.delete("/:freqId", async (req, res) => {
    try {
        let freq = await fRequest.findByIdAndRemove(req.params.freqId);
        if (freq) {
            res.status(200).json({
                status: 200,
                message: "Successfully deleted friend request",
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "Friend Request cannot be deleted/Friend Request not found"
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