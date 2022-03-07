const jsonwebtoken = require("jsonwebtoken");

class AuthController {
  createToken(data, secret, expiresIn) {
    const authToken = jsonwebtoken.sign(
      data,
      secret,
      { expiresIn }
    );

    return authToken;
  };

  tradeTokenForUser(token, secret) {
    try {
      if (token && secret) {
        token = token.replace("Bearer ", "");
        const decoded = jsonwebtoken.verify(token, secret);

        return { decoded };
      } else {
        return { decoded: null };
      }
    } catch (error) {
      return { error };
    }
  };
}

module.exports = new AuthController();
