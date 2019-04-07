const { BigQuery } = require("@google-cloud/bigquery");
const bigqueryClient = new BigQuery();
const regionalMap = {
  //east asia & pacific
  TEA: "'PRK', 'HKG'",
  //europe & central asia
  TEC: "",
  //latin america & caribbean
  TLA: "",
  //middle east & north africa
  TMN: "",
  //south asia
  TSA: "",
  //sub-saharan africa
  TSS: ""
};

const mortalityData = async region => {
  try {
    const countries = regionalMap[region];
    const sqlQuery = `SELECT 
        *
    FROM \`bigquery-public-data.world_bank_health_population.health_nutrition_population\`
    WHERE indicator_code in (
    'SP.DYN.LE00.IN', 
    'SH.DYN.NCOM.ZS',
    'SH.STA.AIRP.P5',
    'SH.STA.POIS.P5',
    'SH.STA.WASH.P5',
    'SH.STA.SUIC.P5'
    )
    and country_code in (${countries})
    and year = 2016
    order by country_code;`;

    const options = {
      query: sqlQuery,
      location: "US"
    };

    const [rows] = await bigqueryClient.query(options);

    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = mortalityData;
