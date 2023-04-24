const { sequelize } = require("../lib/sequelize.lib");
const { DataTypes } = require("sequelize");

const Token = sequelize.define("Token", {
  userId: DataTypes.INTEGER,
  token: DataTypes.STRING,
});

module.exports = Token;
