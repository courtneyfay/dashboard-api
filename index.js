const express = require("express");
const app = express();
const routes = require("./routes.js");
const port = process.env.PORT || 3000;
const cors = require("cors");
const whitelist = ["http://localhost:8080"];
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

// Add CORS middleware headers
app.use(cors(corsOptions));

// Add all routes
app.use("/", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
