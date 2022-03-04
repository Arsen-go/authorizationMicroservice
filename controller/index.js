const { authenticated, roleAuthentication, createToken, tradeTokenForUser } = require("./authentication");

module.exports = { authenticated, tradeTokenForUser, roleAuthentication, createToken };
