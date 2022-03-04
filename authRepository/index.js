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
            logger.info(`AuthRepository: Failed to parse token: ${error}`);
            res.status(500).send({ error: 'Something failed!' });
        }
    };

    async authenticate(req, res) {
        try {
            const { data, secret } = req.body;
            if (!Object.keys(req.body).length) res.status(400).send({ error: 'Something failed!' });
            const authToken = createToken(data, secret);
            res.send({ authToken }).status(200);
        } catch (error) {
            logger.info(`AuthRepository: Failed to authenticate data: ${error}`);
            res.status(500).send({ error: 'Something failed!' });
        }
    }
}

module.exports = new AuthRepository();