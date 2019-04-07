const { BigQuery } = require("@google-cloud/bigquery");
const bigqueryClient = new BigQuery();
const regionalMap = require("./helpers/regionalMap");
const {
  AIR_POLLUTION,
  DISEASE,
  HYGIENE,
  LIFE_EXPECTANCY,
  POISONING,
  SUICIDE
} = require("./helpers/indicatorMap");

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

const mortalityData = async region => {
  try {
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

    const options = {
      query: sqlQuery,
      location: "US"
    };

    const [rows] = await bigqueryClient.query(options);

    return _mapData(rows);
  } catch (err) {
    throw err;
  }
};

module.exports = mortalityData;
