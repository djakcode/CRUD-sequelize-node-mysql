const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/Notice.controller");
const verifyToken = require("../middlewares/auth");

router.post("/add", CONTROLLER.postNotice);
router.delete("/delete/:noticeId", verifyToken, CONTROLLER.deleteNotice);

module.exports = router;
