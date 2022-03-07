require('dotenv').config();
const express = require("express");
const { celebrate, errors } = require('celebrate');
const app = express();
const authRepository = require("./controller");
const cors = require("cors");
const schema = require("./validator");

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 4000, () => { console.log(`Auth Service is running on port ${process.env.PORT || 4000}`) });

app.post('/auth/createToken', celebrate({ body: schema.createSchema }), authRepository.authenticate);

app.post('/auth/checkToken', celebrate({ body: schema.checkSchema }), authRepository.parse);

app.use(errors());
