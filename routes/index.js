const express = require("express");
const router = express.Router({ caseSensitive: true });
const auth = require("./auth");

router.use(auth);

module.exports = router;
