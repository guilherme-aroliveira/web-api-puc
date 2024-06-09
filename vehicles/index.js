const app = require("../rest-server");
let veiculos = require("../db");

// Base URL
const BASE_URL = "/api"
const VEICULOS_BASE_URL = `${BASE_URL}/veiculos`

app.get(`${VEICULOS_BASE_URL}`, (req, res) => {
    res.send(veiculos)
});


// GET endpoint
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

// PUT endpoint
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
    const novoVeiculo = {id,...req.body}
    veiculos.push(novoVeiculo)
    res.status(201).send(novoVeiculo);
});

// PUT endpoint
app.put(`${VEICULOS_BASE_URL}/:id`, (req, res) => {
    const id = req.params.id;
    const exist = veiculos.some(item => item.id == id);

    if (!exist) {
        res.status(404).send({message: "Veiculo nao encontrado"});
        return;
    }
    
    // Change the database
    const oldVeiculos = veiculos.filter(item => item.id != id);
    veiculos = [...oldVeiculos, {id,...req.body}]
    res.send({message: `Veiculo de id ${id} modificado com sucesso`});
});

//PATCH endpoint
app.patch(`${VEICULOS_BASE_URL}/:id`, (req, res) => {
    const id = req.params.id;
    const veiculoAnterior = veiculos.find(item => item.id == id);

    if (!veiculoAnterior) {
        res.status(404).send({message: "Veiculo nao encontrado"});
        return;
    }
    
    // Change the database
    const oldVeiculos = veiculos.filter(item => item.id != id);
    veiculos = [...oldVeiculos, {...veiculoAnterior, id,...req.body}]
    res.send({message: `Veiculo de id ${id} modificado com sucesso`});
});


// DELETE endpoint
app.delete(`${VEICULOS_BASE_URL}/:id`, (req, res) => {
    const id = req.params.id;
    const exist = veiculos.some(item => item.id == id);

    if (!exist) {
        res.status(404).send({message: "Veiculo nao encontrado"});
        return;
    }
    
    // Change the database
    const oldVeiculos = veiculos.filter(item => item.id != id);
    veiculos = oldVeiculos;
    res.status(204).send({message: `Veiculo de id ${id} excluido com sucesso`});
})
