const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require("./routes.js");
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
