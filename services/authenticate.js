const { auth } = require("google-auth-library");
require("dotenv").config();

const authenticateBigQuery = async bigQueryClient => {
  const keysEnvVar = process.env["GOOGLE_CREDENTIALS"];
  if (!keysEnvVar) {
    throw new Error("The $CREDS environment variable was not found!");
  }
  const keys = JSON.parse(keysEnvVar);

  try {
    const client = auth.fromJSON(keys);

    client.scopes = ["https://www.googleapis.com/auth/bigquery"];

    //adding some additional info for authentication
    bigQueryClient.authClient.cachedCredentials = client.credentials;
    bigQueryClient.authClient.jsonContent = keys;
    bigQueryClient.projectId = keys.project_id;

    return client;
  } catch (err) {
    throw err;
  }
};

module.exports = authenticateBigQuery;
