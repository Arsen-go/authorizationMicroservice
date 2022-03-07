const Joi = require('joi');

class Schema {
    createSchema = Joi.object({
        data: Joi.required(),
        //string length if will be greater than 115 characters jwt can fail
        secret: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,115}$')).required(),
        expiresIn: Joi.number().required()
    }).required();

    checkSchema = Joi.object({
        authToken: Joi.string().required(),
        secret: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{5,115}$')).required(),
    }).required();
}

module.exports = new Schema();