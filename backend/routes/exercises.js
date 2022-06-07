const express = require("express");
const Exercise = require("../models/Exercises");
const router = express.Router();

// GET - Fetch all exercises from the exercises Collection
router.get("/list", async (req, res) => {
    try {
        let exercises = await Exercise.find();
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

// GET - Fetch the exercises given the muscle group
router.get("/Groups/:MuscleGroup", async (req, res) => {
    try {
        let exercises = await Exercise.find({
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

// GET - Fetch the exercises give the exercise name
router.get("/Search/:ExerciseName", async (req, res) => {
  try {
      let exercises = await Exercise.find({
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

module.exports = router;
