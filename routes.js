const express = require("express");
const router = express.Router();
const controller = require("./controllers.js");

router.get("/", (req, res) => {
  controller.getHelloWorld(req, res);
});

router.get("/health", (req, res) => {
  controller.getAllHealth(req, res);
});

module.exports = router;
