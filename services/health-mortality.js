const regionalMap = require("../helpers/regionalMap");
const {
  AIR_POLLUTION,
  DISEASE,
  HYGIENE,
  LIFE_EXPECTANCY,
  POISONING,
  SUICIDE
} = require("../helpers/indicatorMap");
const { BigQuery } = require("@google-cloud/bigquery");
const bigQueryClient = new BigQuery();
const authenticateBigQuery = require("./authenticate");

const _mapData = rows => {
  let finalData = {};

  rows.forEach(row => {
    const value = row["value"];
    const indicatorCode = row["indicator_code"];
    const code = row["country_code"];
    const name = row["country_name"];
    const data = {
      [code]: {
        name
      }
    };
    let countryObject = data[code];

    //if country data doesn't yet exist in finalData, add it
    if (!finalData[code]) {
      finalData = Object.assign(finalData, data);
    }

    //add data points to country object
    switch (indicatorCode) {
      case AIR_POLLUTION:
        countryObject["airPollution"] = value;
        break;
      case DISEASE:
        countryObject["disease"] = value;
        break;
      case HYGIENE:
        countryObject["hygiene"] = value;
        break;
      case LIFE_EXPECTANCY:
        countryObject["lifeExpectancy"] = value;
        break;
      case POISONING:
        countryObject["poisoning"] = value;
        break;
      case SUICIDE:
        countryObject["suicide"] = value;
        break;
    }

    //add updated countryObject to finalData for that country
    finalData[code] = Object.assign(finalData[code], countryObject);
  });

  return finalData;
};

const _buildSqlQuery = region => {
  const countries = regionalMap[region];
  const sqlQuery = `SELECT 
      *
    FROM \`bigquery-public-data.world_bank_health_population.health_nutrition_population\`
    WHERE indicator_code in 
      ('${AIR_POLLUTION}',
          '${DISEASE}',
          '${HYGIENE}',
          '${LIFE_EXPECTANCY}',
          '${POISONING}',
          '${SUICIDE}')
    and country_code in (${countries})
    and year = 2016
    order by country_code;`;

  return {
    query: sqlQuery,
    location: "US"
  };
};

const getMortalityData = async region => {
  await authenticateBigQuery(bigQueryClient);
  const sqlQuery = _buildSqlQuery(region);

  try {
    const [rows] = await bigQueryClient.query(sqlQuery);

    return _mapData(rows);
  } catch (err) {
    throw err;
  }
};

module.exports = getMortalityData;
