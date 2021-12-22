const express = require('express');
const bodyParse = require('body-parser');
const passport = require('./Passport')
const config = require('config');
const cors = require('cors');

const app = express();
app.use(passport.initialize());
app.use(express.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(cors());

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
})

module.exports = app;