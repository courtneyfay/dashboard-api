const express = require("express");
const router = express.Router();
const controller = require("../controllers/health-controllers");

router.get("/health/mortality/:region", async (req, res) => {
  const mortalityData = await controller.getRegionalMortalityData(req, res);

  res.send(mortalityData);
});

router.get("/health/nutrition", async (req, res) => {
  const nutritionData = await controller.getObesityDataByGender(req, res);

  res.send(nutritionData);
});

module.exports = router;
