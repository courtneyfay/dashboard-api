const { BigQuery } = require("@google-cloud/bigquery");
const bigqueryClient = new BigQuery();

const healthData = async (req, res) => {
  try {
    const sqlQuery = `SELECT
        CONCAT(
        'https://stackoverflow.com/questions/',
        CAST(id as STRING)) as url,
        view_count
        FROM \`bigquery-public-data.stackoverflow.posts_questions\`
        WHERE tags like '%google-bigquery%'
        ORDER BY view_count DESC
        LIMIT 10`;

    const options = {
      query: sqlQuery,
      location: "US"
    };

    const [rows] = await bigqueryClient.query(options);

    const cleanRows = rows.map(row => {
      const url = row["url"];
      const viewCount = row["view_count"];

      return {
        url,
        viewCount
      };
    });
    console.log("cleanRows", cleanRows);

    return cleanRows;
  } catch (err) {
    throw err;
  }
};

module.exports = healthData;

/*
SERVICE
receives the request data it needs from the manager in order to perform its tasks
figures out the individual details algorithms/business logic/database calls/etc involved in completing the request
is generally only concerned with the tasks he/she has to complete
not responsible for making decisions about the “bigger” picture orchestrating the different service calls
does the actual work necessary to complete the tasks/request
returns the completed work a response to the manager

 */
