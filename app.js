// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./authController');
const mainget = require('./mainQueries/mainGet')
const cors = require('cors');
const sql = require("mssql");
const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());
// Routes
app.use('/auth', authController);
app.use('/get',mainget)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
