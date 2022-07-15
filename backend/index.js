const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const multer = require('multer');
const Grid = require("gridfs-stream");

// specify port number here
const port = 3000;
const config = require("./config");

// import defined users route
const usersRouter = require("./routes/users");
const exercisesRouter = require("./routes/exercises");
const setRouter = require("./routes/set");
const userActivityRouter = require("./routes/userActivity");
const savedfoodRouter = require("./routes/savedfood");
const foodsRouter = require("./routes/foods");

app.use(logger("dev"));

const dbUrl = config.dbUrl;

var options = {
  keepAlive: true,
  connectTimeoutMS: 35000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// connect to database
mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos"
  });
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 // define request routes
app.use("/users", usersRouter);
app.use("/exercises", exercisesRouter);
app.use("/set", setRouter);
app.use("/userActivity", userActivityRouter);
app.use("/savedfood", savedfoodRouter);
app.use("/foods", foodsRouter);

app.get("/file/:filename", async (req, res) => {
  try {
      const file = await gfs.find({ filename: req.params.filename }).toArray()
      if (file.length === 0) {
        res.status(200).json({
          status: 400,
          message: "file not found"
        })
      }
      const file_id = file[0]._id;
      const obj_id = new mongoose.Types.ObjectId(file_id);
      const downloadStream = gfs.openDownloadStream(obj_id);
      
      res.setHeader('Content-Type', 'application/json');
      const buffer = [];
      res.status(200);

      downloadStream.on('data', (chunk) => {
        buffer.push(chunk);
      });

      downloadStream.on('error', async (error) => {
        reject(error);
      });

      downloadStream.on('end', async () => {
        const fbuffer = Buffer.concat(buffer);
        const base64 = fbuffer.toString('base64');
        res.end(JSON.stringify({status: 200, img_data: base64}));
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

app.delete("/file/:filename", async (req, res) => {
  try {
      const file = await gfs.find({filename: req.params.filename}).toArray();
      if (file.length > 0) {
        const file_id = file[0]._id;
        const obj_id = new mongoose.Types.ObjectId(file_id);
        await gfs.delete(obj_id);
        res.status(200).json({
          status: 200,
          message: "Sucessfully deleted file",
        });
      } else {
        res.status(400).json({
          status: 400,
          message: "file not found",
        });
      }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

app.listen(port, function () {
  console.log("Running on " + port);
});

module.exports = app;
