const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const express = require("express");
const { PORT, NODE_ENV } = process.env;
const routes = require("../routes/index");
const { utils } = require("../helpers/utils");
const { sequelize } = require("../lib/sequelize.lib");
const app = express();
const cors = require("cors");

const corsOption = {
  origin: "*",
};
const port = PORT || 5001;

module.exports = {
  start: async function () {
    await sequelize.sync();
    app.use(cors(corsOption));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.setMaxListeners = Infinity;
    routes(app);
    app.listen(port, () => {
      utils.log(
        "blue",
        `AuthService is running http://localhost:${port} ${NODE_ENV}`
      );
    });
  },
};
