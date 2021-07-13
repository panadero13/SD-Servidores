const express = require("express");
const mongoose = require("mongoose");
const CocheOrder = require("../DB/CocheOrder");
const route = express.Router();

route.post("/postCocheOrder", async(req, res) => {
    let { _id, agencia_id, coche_id, usuario_email, precio, fecha_orden, dias_contratados } = req.body;
    let cocheOrder = {};
    cocheOrder._id = _id;
    cocheOrder.agencia_id = agencia_id;
    cocheOrder.coche_id = coche_id;
    cocheOrder.usuario_email = usuario_email;
    cocheOrder.precio = precio;
    cocheOrder.fecha_orden = fecha_orden;
    cocheOrder.dias_contratados = dias_contratados;
    let cocheOrderModel = new CocheOrder(cocheOrder);
    await cocheOrderModel.save();
    res.json(cocheOrderModel);
});

route.get("/getCocheOrderById/:id", async(req, res) => {
    let data = await CocheOrder.findById(req.params.id).exec();
    res.json(data);
});

route.get("/getAllOrders", async(req, res) => {
    CocheOrder.find(function(err, orders) {
        if (err) return console.error(err);
        res.json(orders);
    })
});

route.get("/getCocheOrderByUser/:email", async(req, res) => {
    CocheOrder.find(function(err, orders) {
        if (err) return console.error(err);
        var data = [];
        orders.forEach(order => {
            if (order.usuario_email == req.params.email) {
                data.push(order);
            }
        })
        res.json(data);
    })
});

route.delete("/deleteById/:Id", async(req, res) => {
    await CocheOrder.deleteOne({ _id: `${req.params.Id}` }, (err) => {
        if (err) res.send("Could not delete")
        res.send("Element deleted");
    });
})

route.put("/modificaCocheOrder/:Id/:agencia_id/:coche_id/:usuario_email/:precio/:fecha_orden/:dias_contratados", async(req, res) => {
    await CocheOrder.updateOne({ _id: `${req.params.Id}` }, {
        coche_id: `${req.params.coche_id}`,
        agencia_id: `${req.params.agencia_id}`,
        usuario_email: `${req.params.usuario_email}`,
        precio: `${req.params.precio}`,
        fecha_orden: `${req.params.plazas}`,
        dias_contratados: `${req.params.dias_contratados}`,
    }, (err) => {
        if (err) res.send("Could not update")
        res.send(`Element updated`);
    });
})

module.exports = route;