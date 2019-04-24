const { BigQuery } = require("@google-cloud/bigquery");
const bigQueryClient = new BigQuery();
const authenticateBigQuery = require("./authenticate");
const { MALE, FEMALE, HIGHEST, LOWEST } = require("../datamaps/obesity-map");
const countriesMap = require("../datamaps/countries-map");
const Promise = require("bluebird");

const _mapObesityData = rawData => {
  return rawData[0].map(data => {
    return {
      key: data.country_code,
      name: data.country_name,
      percentage: data.value
    };
  });
};

const _buildObesityQuery = (gender, magnitude) => {
  const sqlQuery = `SELECT 
      country_code
      ,country_name
      ,value
    FROM \`bigquery-public-data.world_bank_health_population.health_nutrition_population\`
    WHERE indicator_code = 'SH.STA.OWAD.${gender}.ZS'
      AND year = 2016
      AND country_code in (${countriesMap.allCountries})
    ORDER BY value ${magnitude}
    LIMIT 20;`;

  return {
    query: sqlQuery,
    location: "US"
  };
};

const getObesityData = async () => {
  //authenticate Big Query API
  await authenticateBigQuery(bigQueryClient);

  //build up 4 SQL queries for highest male, highest female, lowest male and lowest female
  const highestMaleSQL = _buildObesityQuery(MALE, HIGHEST);
  const highestFemaleSQL = _buildObesityQuery(FEMALE, HIGHEST);
  const lowestMaleSQL = _buildObesityQuery(MALE, LOWEST);
  const lowestFemaleSQL = _buildObesityQuery(FEMALE, LOWEST);

  try {
    //make asynchronous SQL requests for all 4 categories of obesity data for 2016
    const results = await Promise.props({
      rawHighestMale: bigQueryClient.query(highestMaleSQL),
      rawHighestFemale: bigQueryClient.query(highestFemaleSQL),
      rawLowestMale: bigQueryClient.query(lowestMaleSQL),
      rawLowestFemale: bigQueryClient.query(lowestFemaleSQL)
    });

    //return an object of arrays
    return {
      highestMale: _mapObesityData(results.rawHighestMale),
      highestFemale: _mapObesityData(results.rawHighestFemale),
      lowestMale: _mapObesityData(results.rawLowestMale),
      lowestFemale: _mapObesityData(results.rawLowestFemale)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = getObesityData;
