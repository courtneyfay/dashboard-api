const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const port = 3000;
const routes = require("./routes.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
