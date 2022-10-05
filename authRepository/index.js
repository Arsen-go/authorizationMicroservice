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

  createRefreshToken(data, secret, expiresIn) {
    const refreshToken = jsonwebtoken.sign({
      message: "use this for refresh auth token",
      metadata: "refreshtoken",
      data
    }, secret, { expiresIn });
    
    return refreshToken;
  }

  tradeTokenForUser(token, secret) {
    try {
      if (token && secret) {
        token = token.replace("Bearer ", "");
        const decoded = jsonwebtoken.verify(token, secret);

        return decoded;
      } else {
        return null;
      }
    } catch (error) {
      return { error };
    }
  };
}

module.exports = new AuthController();
