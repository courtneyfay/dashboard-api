const express = require("express");
const app = express();
const routes = require("./routes.js");
const port = process.env.PORT || 3000;

app.use("/", routes);

// Add CORS middleware headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS" //POST, PUT, PATCH, DELETE
  );

  // Request headers you wish to allow
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "X-Requested-With,content-type"
  // );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
