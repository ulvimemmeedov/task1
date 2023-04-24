const { response } = require("../helpers/utils");
const { verify } = require("../lib/jwt.lib");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bareer:"))
    return response.unauthorized(res, {
      success: false,
      message: "You are not Authorize this route",
    });
  const token = authHeader.split(" ")[1];

  if (!token)
    return response.unauthorized(res, {
      success: false,
      message: "You are not Authorize this route",
    });

  verify(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      return response.unauthorized(res, {
        success: false,
        message: "You are not Authorize this route",
      });
    });
}

module.exports = authenticateToken;
