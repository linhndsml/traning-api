const mongoose = require("mongoose");

mongoose
  .connect("mongodb://test:Test123@ds331548.mlab.com:31548/traning-api", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to database");
  });
