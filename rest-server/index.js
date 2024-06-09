// Importing the express module
const express = require("express")
const bodyParser = require("body-parser");

// calling the express function
const app = express();

app.use(bodyParser.json()); // middleware

// Export the app
module.exports = app;