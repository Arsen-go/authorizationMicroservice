const express = require("express");
require("./db");
const app = express();
const cors = require("cors");
const authRepository = require("./authRepository");
const { validateCreateRequest, validateCheckRequest } = require("./validator");

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 4000, () => { console.log(`Auth Service is running on port ${process.env.PORT || 4000}`) });

app.post('/auth/createToken', validateCreateRequest, authRepository.authenticate);

app.post('/auth/checkToken', validateCheckRequest, authRepository.parse);