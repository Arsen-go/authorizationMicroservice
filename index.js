const express = require("express");
require("./db");
const app = express();

app.use(express.json());

app.listen(process.env.PORT || 4000, () => { console.log(`Auth Service is running on port ${process.env.PORT || 4000}`) });