const express = require("express");
const UserActivity = require("../models/UserActivity");
const router = express.Router();

// POST - Creates new object in the UserActivity Collection
router.post("/", async (req, res) => {
    try {
        let userActivity = new UserActivity(req.body);
        post = await userActivity.save();
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

// GET - Fetch all user activities given a userId
router.get("/:userId", async (req, res) => {
    try {
        let userActivity = await UserActivity.find({
          userId: req.params.userId,
        });
        if (userActivity) {
            // user activity is found
            res.status(200).json({
                status: 200,
                data: userActivity,
            });
        } else {
            // user set history cannot be found in db
            res.status(400).json({
                status: 400,
                message: "User activity not found",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    } 
});

// GET - Fetch user activity for a user for some particular day
router.get("/:userId/:date", async (req, res) => {
  try {
      let userActivity = await UserActivity.find({
        userId: req.params.userId,
        date:{
          $gte: new Date(req.params.date).setHours(0,0,0,0), 
          $lt: new Date(req.params.date).setHours(24,0,0,0),
      }
      });
      if (userActivity) {
          // user activity is found
          res.status(200).json({
              status: 200,
              data: userActivity,
          });
      } else {
          // user set history cannot be found in db
          res.status(400).json({
              status: 400,
              message: "User activity not found",
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
router.patch("/:activityId", async (req, res) => {
  try {
      let userActivity = await UserActivity.findByIdAndUpdate(req.params.activityId, req.body, {
          new: true,
      });
      if (userActivity) {
          res.status(200).json({
              status: 200,
              data: userActivity,
          });
      } else {
          res.status(400).json({
              status: 400, 
              message: "userActivity not found/Update cannot be done",
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
