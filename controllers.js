const getMortalityData = require("./services.js");

const getAllMortalityData = async (req, res) => {
  //TODO: remove this default region value that appeases Swagger
  let region = req.params.region;
  if (region === "{region}") {
    region = "TEA";
  }
  const results = await getMortalityData(region);

  return results;
};

module.exports = {
  getAllMortalityData
};
