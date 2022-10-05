const { tradeTokenForUser, createToken, createRefreshToken } = require("../authRepository");
const { logger } = require("../logger");

class AuthRepository {
    parse(req, res) {
        try {
            const { authToken, secret } = req.body;
            const decoded = tradeTokenForUser(authToken, secret);
            if (!decoded) return res.status(401).send({ error: 'Unauthenticated!' });
            res.send({ decoded }).status(200);
        } catch (error) {
            logger.error(`AuthRepository: Failed to parse token: ${error}`);
            res.status(500).send({ error: 'Something failed!' });
        }
    };

    authenticate(req, res) {
        try {
            const { data, secret, expiresIn, refreshExpiresIn } = req.body;
            const authToken = createToken(data, secret, expiresIn);
            const refreshToken = createRefreshToken(data, secret, refreshExpiresIn ? refreshExpiresIn : expiresIn * 2);
            res.send({ authToken, refreshToken }).status(200);
        } catch (error) {
            logger.error(`AuthRepository: Failed to authenticate data: ${error}`);
            res.status(500).send({ error: 'Something failed!' });
        }
    }
}

module.exports = new AuthRepository();