const jsonwebtoken = require("jsonwebtoken");

class AuthController {
  createToken(data, secret) {
    const authToken = jsonwebtoken.sign(
      data,
      secret,
      // { expiresIn: 11122 }
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
        return null;
      }
    } catch (error) {
      return { error };
    }
  };
}

module.exports = new AuthController();
