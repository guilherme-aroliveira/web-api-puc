const app = require("../rest-server");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../open-api.json")

app.use("/open-api", swaggerUi.serve, swaggerUi.setup(swaggerFile));