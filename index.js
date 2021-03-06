const express = require("express");
const app = express();
const routes = require("./routes/health-routes");
const port = process.env.PORT || 3000;
const cors = require("cors");
const whitelist = [
  "http://localhost:8080",
  "http://whodashboard.herokuapp.com",
  "http://localhost:3000"
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDoc = yaml.load("./swagger.yaml");

// Add CORS middleware headers
app.use(cors(corsOptions));

// Add Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Add all routes
app.use("/", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
