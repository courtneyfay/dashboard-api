const express = require("express");
const router = express.Router();
const controller = require("./controllers.js");

router.get("/health/mortality/:region", async (req, res) => {
  const health = await controller.getAllMortalityData(req, res);

  res.send(health);
});

module.exports = router;
