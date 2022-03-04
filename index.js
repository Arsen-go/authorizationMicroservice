const express = require("express");
require("./db");
const app = express();
const cors = require("cors");
const authRepository = require("./authRepository");

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 4000, () => { console.log(`Auth Service is running on port ${process.env.PORT || 4000}`) });

app.post('/auth/create', (req, res) => authRepository.authenticate(req, res));

app.post('/auth/check', (req, res) => authRepository.parse(req, res));