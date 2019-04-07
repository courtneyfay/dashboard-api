const express = require("express");
const router = express.Router();
const controller = require("./controllers.js");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDoc = yaml.load("./swagger.yaml");

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDoc));

router.get("/health/mortality/:region", async (req, res) => {
  const health = await controller.getAllMortalityData(req, res);

  res.send(health);
});

module.exports = router;
