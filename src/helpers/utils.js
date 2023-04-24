const {
  success,
  forbidden,
  unauthorized,
  error: errorApi,
} = require("express-easy-helper");

const log = (color, ...raw) => {
  let c = "\x1b[0m%s\x1b[0m";
  if (color) {
    if (color == "blue") c = "\x1b[36m%s\x1b[0m";
    if (color == "yellow") c = "\x1b[33m%s\x1b[0m";
    if (color == "red") c = "\x1b[31m%s\x1b[0m";
    if (color == "black") c = "\x1b[30m%s\x1b[0m";
    if (color == "white") c = "\x1b[1m%s\x1b[0m";
    if (color == "green") c = "\x1b[32m%s\x1b[0m";
    if (color == "purple") c = "\x1b[35m%s\x1b[0m";
    if (color == "gray") c = "\x1b[37m%s\x1b[0m";
  }
  console.log(c, ...raw);
};

const error = (res, e) => {
  log("red", { err: e });
  if (e instanceof ReferenceError) {
    return errorApi(res, { err: "ReferenceError" });
  } else if (e instanceof TypeError) {
    return errorApi(res, { err: "TypeError" });
  } else {
    return errorApi(res, { err: e });
  }
};

module.exports = {
  response: { success, forbidden, unauthorized, error },
  utils: {
    log,
  },
};
