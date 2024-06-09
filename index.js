// Importing the express module
const express = require("express")

// calling the express function
const app = express();
const veiculos = [
    {id:0, placa:"ABC-1234", modelo:"Fusca", marca:"Volkswagen", ano:"1970", cor:"Azul", pecas: [
        {id:0, nome:"Motor", mcarca:"Volkswagen", ano:1970, preco:1000},
        {id:1, nome:"Pneu", marca:"Pirelli", ano:1970, preco:200},
        {id:2, nome:"Bateria", marca:"Moura", ano:1970, preco:300},
    ]},
    {id:1, placa:"DEF-5678", modelo:"Gol", marca:"Volkswagen", ano:"2000", cor:"Preto", pecas: [
        {id:0, nome:"Motor", mcarca:"Volkswagen", ano:2000, preco:1000},
        {id:1, nome:"Pneu", marca:"Pirelli", ano:2000, preco:200},
        {id:2, nome:"Bateria", marca:"Moura", ano:2000, preco:300},
    ]},
    {id:2, placa:"GHI-9012", modelo:"Uno", marca:"Volkswagen", ano:"2005", cor:"Branco", pecas: [
        {id:0, nome:"Motor", mcarca:"Fiat", ano:2005, preco:1000},
        {id:1, nome:"Pneu", marca:"Pirelli", ano:2005, preco:200},
        {id:2, nome:"Bateria", marca:"Moura", ano:2005, preco:300},
    ]},
];

// Base URL
const BASE_URL = "/api"
const VEICULOS_BASE_URL = `${BASE_URL}/veiculos`

app.get(`${VEICULOS_BASE_URL}`, (req, res) => {
    res.send(veiculos)
});

app.get(`${VEICULOS_BASE_URL}/:id`, (req, res) => {
    const id = req.params.id;
    const veiculo = veiculos.find(v => v.id == id);

    if(!veiculo) {
        res.status(404).send({mensagem:"Veiculo inexistente"})
    } 
    else {
        res.send(veiculo)
    } 
});

// testing the endpoint
app.get("/test", (req, res) => {
    res.send({description: "API PUC Minas - Running correclty"})
});

// Running the server
const server = app.listen(8081, "127.0.0.1", function () {
    const address = server.address().address;
    const port = server.address().port;
    
    console.log(`Server running on the address ${address} form the port ${port}`)
});
