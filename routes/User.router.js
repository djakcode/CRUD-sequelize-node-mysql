const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/User.controller");

router.post("/register", CONTROLLER.signup);

router.post("/login", CONTROLLER.signin);

router.get("/all", CONTROLLER.getAllUsers);

module.exports = router;
