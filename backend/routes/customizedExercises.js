const express = require("express");
const CustomizedExercise = require("../models/CustomizedExercises");
const router = express.Router();

// GET - Fetch all customized exercises of user userId
router.get("/:userId/list", async (req, res) => {
    try {
        let exercises = await CustomizedExercise.find(
            {
                userId: {$regex: req.params.userId},
            }
        );
        res.status(200).json({
            status: 200,
            data: exercises,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// GET - Fetch customized exercises of user userId given the muscle group
router.get("/:userId/Groups/:MuscleGroup", async (req, res) => {
    try {
        let exercises = await CustomizedExercise.find({
            // userId
          userId: {$regex: req.params.userId},
          MuscleGroup: { $regex: req.params.MuscleGroup},
        });
        if (exercises) {
            // exercises are found
            res.status(200).json({
                status: 200,
                data: exercises,
            });
        } else {
            // user cannot be found in db
            res.status(400).json({
                status: 400,
                message: "no exercises found",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    } 
});

// GET - Fetch the customized exercise give the exercise name
router.get("/:userId/Search/:ExerciseName", async (req, res) => {
  try {
      let exercises = await CustomizedExercise.find({
        userId: {$regex: req.params.userId},
        ExerciseName: { $regex: req.params.ExerciseName},
      });
      if (exercises) {
          // exercises are found
          res.status(200).json({
              status: 200,
              data: exercises,
          });
      } else {
          // user cannot be found in db
          res.status(400).json({
              status: 400,
              message: "no exercises found",
          });
      }
  } catch (err) {
      res.status(400).json({
          status: 400,
          message: err.message,
      });
  } 
});

// POST - Creates new object in the CustomizedExercises Collection
router.post("/", async (req, res) => {
    try {
        let set = new CustomizedExercise(req.body);
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

module.exports = router;
