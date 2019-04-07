const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require("./routes.js");
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

//middleware to get heroku working
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://boiling-fjord-16588.herokuapp.com/"
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization" //X-Requested-With,content-type
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  return next();
});

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
