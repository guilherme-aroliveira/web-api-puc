// Importing the express module
const express = require("express")

// calling the express function
const app = express();

//
const server = app.listen(8081, function () {
    const address = server.address().address;
    const port = server.address().port;
    
    console.log(`Server running on thr address ${address} form the port ${port}`)
})
