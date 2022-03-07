const { tradeTokenForUser, createToken } = require("../controller");
const { logger } = require("../logger");

class AuthRepository {
    parse(req, res) {
        try {
            const { authToken, secret } = req.body;
            const { decoded } = tradeTokenForUser(authToken, secret);
            if (!decoded) res.status(401).send({ error: 'Unauthenticated!' });
            res.send({ decoded }).status(200);
        } catch (error) {
            logger.error(`AuthRepository: Failed to parse token: ${error}`);
            res.status(500).send({ error: 'Something failed!' });
        }
    };

    authenticate(req, res) {
        try {
            const { data, secret, expiresIn } = req.body;
            const authToken = createToken(data, secret, expiresIn);
            res.send({ authToken }).status(200);
        } catch (error) {
            logger.error(`AuthRepository: Failed to authenticate data: ${error}`);
            res.status(500).send({ error: 'Something failed!' });
        }
    }
}

module.exports = new AuthRepository();