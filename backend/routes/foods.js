const express = require("express");
const Food = require("../models/Foods");
const router = express.Router();

// GET - Fetch all exercises from the exercises Collection
router.get("/list", async (req, res) => {
    try {
        let foods = await Food.find();
        res.status(200).json({
            status: 200,
            data: foods,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// GET - Fetch the foods given the food group
router.get("/Groups/:FoodGroup", async (req, res) => {
    try {
        let foods = await Food.find({
          FoodGroup: { $regex: req.params.FoodGroup},
        });
        if (foods) {
            res.status(200).json({
                status: 200,
                data: foods,
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "no foods found",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// GET - Fetch the foods give the food name
router.get("/Search/:FoodName", async (req, res) => {
  try {
      let foods = await Food.find({
        FoodName: { $regex: req.params.FoodName},
      });
      if (foods) {
          res.status(200).json({
              status: 200,
              data: foods,
          });
      } else {
          res.status(400).json({
              status: 400,
              message: "no foods found",
          });
      }
  } catch (err) {
      res.status(400).json({
          status: 400,
          message: err.message,
      });
  }
});

router.get("/:Carbohydrate", async (req, res) => {
  try {
      let foods = await Food.find({
        Carbohydrate: { $regex: req.params.Carbohydrate},
      });
      if (foods) {
          res.status(200).json({
              status: 200,
              data: foods,
          });
      } else {
          res.status(400).json({
              status: 400,
              message: 0,
          });
      }
  } catch (err) {
      res.status(400).json({
          status: 400,
          message: err.message,
      });
  }
});

// GET - Fetch the foods give the food name
router.get("/:Fat", async (req, res) => {
  try {
      let foods = await Food.find({
        Fat: { $regex: req.params.Fat},
      });
      if (foods) {
          res.status(200).json({
              status: 200,
              data: foods,
          });
      } else {
          res.status(400).json({
              status: 400,
              message: 0,
          });
      }
  } catch (err) {
      res.status(400).json({
          status: 400,
          message: err.message,
      });
  }
});

// GET - Fetch the foods give the food name
router.get("/:Protein", async (req, res) => {
  try {
      let foods = await Food.find({
        Protein: { $regex: req.params.Protein},
      });
      if (foods) {
          res.status(200).json({
              status: 200,
              data: foods,
          });
      } else {
          res.status(400).json({
              status: 400,
              message: 0,
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