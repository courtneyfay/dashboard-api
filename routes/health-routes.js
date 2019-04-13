const express = require("express");
const router = express.Router();
const controller = require("../controllers/health-controllers");

router.get("/health/mortality/:region", async (req, res) => {
  const health = await controller.getAllMortalityData(req, res);

  res.send(health);
});

module.exports = router;
