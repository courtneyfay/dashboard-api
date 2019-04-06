const getAllHealth = (req, res) => {
  const health = "Got the health from the controller";
  res.json(health);
};

const getHelloWorld = (req, res) => {
  const helloWorld = "Hello world!";
  res.json(helloWorld);
};

module.exports = {
  getAllHealth,
  getHelloWorld
};
