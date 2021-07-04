const express = require("express");
const mongoose = require("mongoose");
const Coche = require("../DB/Coche");
const route = express.Router();

route.post("/postCoche", async(req, res) => {
    let { marca, modelo, plazas, disponible, precio, stock } = req.body;
    let coche = {};
    coche.marca = marca;
    coche.modelo = modelo;
    coche.precio = precio;
    coche.disponible = disponible;
    coche.plazas = plazas;
    coche.stock = stock;
    let cocheModel = new Coche(coche);
    await cocheModel.save();
    res.json(cocheModel);
});

route.get("/getCocheById/:id", async(req, res) => {
    let data = await Coche.findById(req.params.id).exec();
    res.json(data);
});

route.get("/getAll", async(req, res) => {
    Coche.find(function(err, coches) {
        if (err) return console.error(err);
        res.json(coches);
    })
});

route.get("/getCocheByMarca/:marca", async(req, res) => {
    Coche.find(function(err, coches) {
        if (err) return console.error(err);
        var data = [];
        coches.forEach(coche => {
            if (coche.marca == req.params.marca) {
                data.push(coche);
            }
        })
        res.json(data);
    })
});

route.get("/getCocheByPrecio/:precio", async(req, res) => {
    Coche.find(function(err, coches) {
        if (err) return console.error(err);
        var data = [];
        coches.forEach(coche => {
            if (coche.precio <= req.params.precio) {
                data.push(coche);
            }
        })
        res.json(data);
    })
});

route.delete("/deleteById/:Id", async(req, res) => {
    await Coche.deleteOne({ _id: `${req.params.Id}` }, (err) => {
        if (err) res.send("Could not delete")
        res.send("Element deleted");
    });
})

route.put("/modificaCoche/:Id/:marca/:modelo/:precio/:plazas/:disponible/:stock", async(req, res) => {
    await Coche.updateOne({ _id: `${req.params.Id}` }, {
        marca: `${req.params.marca}`,
        modelo: `${req.params.modelo}`,
        precio: `${req.params.precio}`,
        plazas: `${req.params.plazas}`,
        disponible: `${req.params.disponible}`,
        stock: `${req.params.stock}`,
    }, (err) => {
        if (err) res.send("Could not update")
        res.send(`Element updated`);
    });
})

route.put("/modificaStock/:Id/:qty", async(req, res) => {
    await Coche.updateOne({ _id: `${req.params.Id}` }, {
        stock: `${req.params.qty}`,
    }, (err) => {
        if (err) res.send("Could not update")
        res.send(`Element updated`);
    });
})


module.exports = route;