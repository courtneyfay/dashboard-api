const regionalMap = require("../datamaps/regional-map");
const {
  AIR_POLLUTION,
  DISEASE,
  HYGIENE,
  LIFE_EXPECTANCY,
  POISONING,
  SUICIDE
} = require("../datamaps/indicator-map");
const { BigQuery } = require("@google-cloud/bigquery");
const bigQueryClient = new BigQuery();
const authenticateBigQuery = require("./authenticate");

const _addLifeExpectancyData = (rows, mortalityData) => {
  rows.forEach(row => {
    const value = row.value;
    const code = row.country_code;
    const year = row.year;
    const date = `${year}-01-01`;
    let lineChart = {};

    //if country code doesn't already exist in mortalityData, ignore it
    if (!mortalityData[code]) {
      return;
    }
    let countryObject = mortalityData[code];

    //if lineChart object doesn't yet exist on mortalityData.countryObject, add it
    if (!countryObject["lineChart"]) {
      countryObject["lineChart"] = lineChart;
    }

    //if year doesn't yet exist in lineChart, add it
    //then add new lineChart to countryObject
    if (!lineChart[date]) {
      lineChart[date] = value;
      countryObject.lineChart = Object.assign(
        countryObject.lineChart,
        lineChart
      );
    }
  });

  return mortalityData;
};

const _mapMortalityData = rows => {
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

const _buildLifeExpectancyQuery = countries => {
  const sqlQuery = `SELECT
    country_code, year, value
  FROM \`bigquery-public-data.world_bank_health_population.health_nutrition_population\`
  WHERE indicator_code = '${LIFE_EXPECTANCY}'
  and country_code in (${countries})
  order by country_code;`;

  return {
    query: sqlQuery,
    location: "US"
  };
};

const _buildMortalityQuery = countries => {
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
  //authenticate Big Query API
  await authenticateBigQuery(bigQueryClient);

  //build up both SQL queries for selected countries
  const countries = regionalMap[region];
  const mortalitySQL = _buildMortalityQuery(countries);
  const lifeExpectancySQL = _buildLifeExpectancyQuery(countries);

  try {
    //make SQL requests for general mortality data for 2016
    //and detailed life expectancy data from 1960 - 2016
    const [rawMortalityData] = await bigQueryClient.query(mortalitySQL);
    const [rawLifeExpectancyData] = await bigQueryClient.query(
      lifeExpectancySQL
    );
    const mortalityData = _mapMortalityData(rawMortalityData);

    return _addLifeExpectancyData(rawLifeExpectancyData, mortalityData);
  } catch (err) {
    throw err;
  }
};

module.exports = getMortalityData;
