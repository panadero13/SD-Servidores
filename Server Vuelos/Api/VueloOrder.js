const express = require("express");
const mongoose = require("mongoose");
const VueloOrder = require("../DB/VueloOrder");
const route = express.Router();

route.post("/postVueloOrder", async(req, res) => {
    let { _id, agencia_id, vuelo_id, usuario_email, precio, fecha_orden, plazas_compradas } = req.body;
    let vueloOrder = {};
    vueloOrder._id = _id;
    vueloOrder.agencia_id = agencia_id;
    vueloOrder.vuelo_id = vuelo_id;
    vueloOrder.usuario_email = usuario_email;
    vueloOrder.precio = precio;
    vueloOrder.fecha_orden = fecha_orden;
    vueloOrder.plazas_compradas = plazas_compradas;
    let vueloOrderModel = new VueloOrder(vueloOrder);
    await vueloOrderModel.save();
    res.json(vueloOrderModel);
});

route.get("/getVueloOrderById/:id", async(req, res) => {
    let data = await VueloOrder.findById(req.params.id).exec();
    res.json(data);
});

route.get("/getAllOrders", async(req, res) => {
    VueloOrder.find(function(err, orders) {
        if (err) return console.error(err);
        res.json(orders);
    })
});

route.get("/getVueloOrderByUser/:email", async(req, res) => {
    VueloOrder.find(function(err, orders) {
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
    await VueloOrder.deleteOne({ _id: `${req.params.Id}` }, (err) => {
        if (err) res.send("Could not delete")
        res.send("Element deleted");
    });
})

route.put("/modificaVueloOrder/:Id/:agencia_id/:vuelo_id/:usuario_email/:plazas_compradas/:precio/:fecha_orden", async(req, res) => {
    await VueloOrder.updateOne({ _id: `${req.params.Id}` }, {
        agencia_id: `${req.params.agencia_id}`,
        vuelo_id: `${req.params.vuelo_id}`,
        usuario_email: `${req.params.usuario_email}`,
        plazas_compradas: `${req.params.plazas_compradas}`,
        precio: `${req.params.precio}`,
        fecha_orden: `${req.params.fecha_orden}`
    }, (err) => {
        if (err) res.send("Could not update")
        res.send(`Element updated`);
    });
})

module.exports = route;