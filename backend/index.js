const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// specify port number here
const port = 3000;
const config = require("./config");
// import defined users route
const usersRouter = require("./routes/users");
// import defined resultPlan route
const resultPlanRouter = require('./routes/resultPlan')

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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", usersRouter); // define request route

// resultPlan route
app.use('/resultPlan', resultPlanRouter)

app.listen(port, function () {
  console.log("Runnning on " + port);
});

module.exports = app;
