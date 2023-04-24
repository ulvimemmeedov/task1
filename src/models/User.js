const { sequelize } = require("../lib/sequelize.lib");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  email: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  phone: DataTypes.STRING,
});

module.exports = User;
