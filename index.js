const app = require("./rest-server");

require("./vehicles")

// testing the endpoint
app.get("/test", (req, res) => {
    res.send({description: "API PUC Minas - Running correclty"})
});

// Running the server
const server = app.listen(8081, "127.0.0.1", function () {
    const address = server.address().address;
    const port = server.address().port;
    
    console.log(`Server running on the address ${address} from the port ${port}`)
});
