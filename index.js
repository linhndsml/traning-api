const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./routes");
const cors = require("cors");

require("dotenv").config();
require("./db");
const app = express();
const PORT = process.env.PORT || 3306;
// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan(":method :url :response-time"));
app.use(router);

app.listen(PORT, () => {
  console.log("> Server listening on port " + PORT);
});
