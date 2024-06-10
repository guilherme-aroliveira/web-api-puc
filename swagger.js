const swaggerAutogen = require("swagger-autogen");

const outputFile = "./open-api.json";
const endpoints = ["./vehicles/index.js"];

swaggerAutogen(outputFile, endpoints);