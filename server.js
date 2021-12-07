const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const apiRoutes = require("./routes/routeAPI.js");
const htmlRoutes = require("./routes/routeHTML.js")

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/databaseWorkout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app); 
app.listen(PORT, () => {
  console.log(`Workout App listening on port ${PORT}.`);
});