const accountModel = require("../models/account.model");

module.exports = {
  register: async (req, res) => {
    const body = req.body;
    const newAccount = await accountModel.create(body);
    return res.status(201).json(newAccount);
  },
  login: async (req, res) => {
    const body = req.body; //username, password
    console.log(body)
    const account = await accountModel.findOne({
      username: body.username,
      password: body.password,
    });
    if (!account) {
      return res.status(404).json({
        statusCode: 404,
        message: "Account not found",
      });
    }
    return res.status(200).json(account)
  },
};
