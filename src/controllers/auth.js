const { response } = require("../helpers/utils");

const {
  generateAccessToken,
  verifyRefreshToken,
  generateToken,
} = require("../lib/jwt.lib");
const { compare, createHash } = require("../lib/bcrypt.lib");

const UserModel = require("../models/User");
const Token = require("../models/Token");

module.exports = {
  signin: async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });
    if (!user) return response.error(res, { message: "User Not found" });

    if (!compare(user.password, password))
      return response.unauthorized(res, "wrong username or password");

    const tokens = await generateAccessToken(user);

    return response.success(res, { message: "Signin success", tokens });
  },
  signup: async (req, res) => {
    const { username, email, password, phone } = req.body;

    const result = await UserModel.create({
      username,
      email,
      password: createHash(password),
      phone,
    });

    return response.success(res, result);
  },
  getInfo: async (req, res) => {
    const userId = req.user.id;

    const user = await UserModel.findOne({ where: { id: userId } });

    return response.success(res, user);
  },
  updateInfo: async (req, res) => {
    const { phone, email } = req.body;
    if (!phone || !email) return response(res, {});
    const userId = req.user.id;

    await UserModel.update({ email, phone }, { where: { id: userId } });
    return response.success(res, { success: true });
  },
  accessToken: async (req, res) => {
    verifyRefreshToken(req.body.refreshToken)
      .then(({ tokenDetails }) => {
        const payload = { _id: tokenDetails._id };
        const accessToken = generateToken(payload);
        response.success(res, {
          success: true,
          accessToken,
        });
      })
      .catch((err) => {
        response.forbidden(res, err);
      });
  },
  deleteToken: async (req, res) => {
    const userId = req.user.id;
    await Token.destroy({
      where: {
        userId,
      },
    });

    response.success(res, {
      success: true,
      message: "Logged Out Sucessfully",
    });
  },
};
