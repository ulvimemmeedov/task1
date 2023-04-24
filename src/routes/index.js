const {
  getInfo,
  updateInfo,
  deleteToken,
  signup,
  signin,
  accessToken,
} = require("../controllers/auth");
const { latency } = require("../controllers/main");
const authenticateToken = require("../middleware/auth");

module.exports = (app) => {
  app.post("/signin", signin);
  app.post("/signup", signup);
  app.get("/info", authenticateToken, getInfo);
  app.put("/info", authenticateToken, updateInfo);
  app.get("/latency", authenticateToken, latency);
  app.post("/token", accessToken);
  app.delete("/token", authenticateToken, deleteToken);
};
