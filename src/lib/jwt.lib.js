const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE, REFRESH_SECRET, REFRESH_EXPIRE } = process.env;
const Token = require("../models/Token");

async function generateAccessToken(user) {
  try {
    const payload = {
      id: user.id,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRE,
    });

    await Token.destroy({ where: { userId: user.id } });

    await Token.create({ userId: user.id, token: refreshToken });

    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
}

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    Token.findOne({ where: { token: refreshToken } })
      .then((doc) => {
        jwt.verify(refreshToken, REFRESH_SECRET, (err, tokenDetails) => {
          if (err)
            return reject({
              success: false,
              message: "Invalid refresh token",
              err,
            });
          resolve({
            tokenDetails,
            success: true,
            message: "Valid refresh token",
          });
        });
      })
      .catch((err) =>
        reject({ success: true, message: "Invalid refresh token", err })
      );
  });
};

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
}

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};

module.exports = {
  generateAccessToken,
  verify,
  verifyRefreshToken,
  generateToken,
};
