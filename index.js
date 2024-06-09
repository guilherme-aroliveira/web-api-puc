// Importing the express module
const express = require("express")
const bodyParser = require("body-parser");

// calling the express function
const app = express();

app.use(bodyParser.json()); // middleware

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
    {id:2, placa:"GHI-9012", modelo:"Uno", marca:"Fiat", ano:"2005", cor:"Branco", pecas: [
        {id:0, nome:"Motor", marca:"Fiat", ano:2005, preco:1000},
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

app.post(`${VEICULOS_BASE_URL}`, (req, res) => {
    if (req.body.id) {
        res.status(412).send({message:"Veiculo nao deve conter id para ser incluido"});
        return;
    }
    if (!req.body.modelo) {
        res.status(412).send({message:"Modelo e obrigatorio"});
        return;
    }
    if (!req.body.marca) {
        res.status(412).send({message:"Marca e obrigatorio"});
        return;
    }


    const funcaoReducer = (anterior, atual) => {
        if (atual.id > anterior) {
            return atual.id
        }
        else {
            return anterior
        }
    }


    const id = veiculos.reduce(funcaoReducer, 0) + 1;
    const novoVeiculo = {...req.body,id}
    veiculos.push(novoVeiculo)
    res.status(201).send(novoVeiculo);
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
