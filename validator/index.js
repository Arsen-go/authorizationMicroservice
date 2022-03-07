const Joi = require('joi');
const { logger } = require("../logger");

class Validate {
    validateCreateRequest(req, res, next) {
        if (!Object.keys(req.body).length) {
            logger.info("Request body is not exist.");
            return res.status(400).send({ error: "Request body is not exist." });
        }
        const body = req.body;

        const schema = Joi.object({
            data: Joi.required(),
            //string length if will be greater than 115 characters jwt can fail
            secret: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{5,115}$')).required(),
            expiresIn: Joi.number().required(),
        });

        try {
            const { error } = schema.validate(body);
            if (error) {
                return res.status(400).send({ error: `Failed to validate request data. ${error.message}` });
            }
            next();
        } catch (error) {
            logger.warn(`Failed to validate request data. ${error}`);
            return res.status(500).send({ error: "`Failed to validate request data." });
        }
    };

    validateCheckRequest(req, res, next) {
        if (!Object.keys(req.body).length) {
            logger.info("Request body is not exist.");
            return res.status(400).send({ error: "Request body is not exist." });
        }
        const body = req.body;

        const schema = Joi.object({
            authToken: Joi.string().required(),
            //string length if will be greater than 115 characters jwt can fail
            secret: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{5,115}$')).required(),
        });

        try {
            const { error } = schema.validate(body);
            if (error) {
                return res.status(400).send({ error: `Failed to validate request data. ${error.message}` });
            }
            next();
        } catch (error) {
            logger.warn(`Failed to validate request data. ${error}`);
            return res.status(500).send({ error: "`Failed to validate request data." });
        }
    }
}

module.exports = new Validate()