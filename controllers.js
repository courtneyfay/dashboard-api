const getMortalityData = require("./services.js");

const getAllMortalityData = async (req, res) => {
  //TODO: change this to grab the input parameter in Swagger
  // console.log("req.swagger", req.swagger.params.region.value);
  const region = "TEA";
  const results = await getMortalityData(region);

  return results;
};

module.exports = {
  getAllMortalityData
};
