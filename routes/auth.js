const express = require("express");
const { requireFields } = require("./middleware");
const { authController } = require("../controllers");

const router = express.Router({ caseSensitive: true });
// router.get("/signup", authController.getAllUser);
router.post(
  "/signup",
  requireFields({ body: ["email", "password"] }),
  authController.createUser
);
router.post(
  "/signin",
  requireFields({ body: ["email", "password"] }),
  authController.signIn
);
router.get("/check_token", authController.checkToken);
module.exports = router;
