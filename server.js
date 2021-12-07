const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.once('open', function() {
  console.log('Connection has been made!'); 
})
.on('error', function(error) {
  console.log("Connection Error:", error); 
}); 

require("./routes/apiRoutes")(app); 
require("./routes/viewRoutes")(app); 


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});