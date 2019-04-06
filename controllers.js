const healthData = require("./services.js");

const getAllHealth = async (req, res) => {
  const results = await healthData(req, res);
  console.log("results", results);
  return results;
};

module.exports = {
  getAllHealth
};

/*
CONTROLLER
manages the incoming work HTTP requests
decides which worker what service should do the work
splits up the work into sizable units
passes that work the necessary data from the HTTP requests off to the service(s)
if the work requires multiple people services working on multiple things, orchestrates the work those service calls
but does not do the work himself/herself (again, using a basic stereotype here!) (not a stereotype here, the controller shouldn’t be doing the work) 
So there is some logic in the controller, but it is not the business logic/algorithms/database calls/etc that the services take care of. Again, 
the controller is a manager/supervisor.*/
