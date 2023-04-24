var bcrypt = require("bcryptjs");

function createHash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function compare(hash, pass) {
  return bcrypt.compareSync(pass, hash);
}

module.exports = { createHash, compare };
