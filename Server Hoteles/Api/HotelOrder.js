const express = require("express");
const mongoose = require("mongoose");
const HotelOrder = require("../DB/HotelOrder");
const route = express.Router();

route.post("/postHotelOrder", async(req, res) => {
    let { _id, hotel_id, usuario_email, precio, fecha_orden, dias_contratados } = req.body;
    let hotelOrder = {};
    hotelOrder._id = _id;
    hotelOrder.hotel_id = hotel_id;
    hotelOrder.usuario_email = usuario_email;
    hotelOrder.precio = precio;
    hotelOrder.fecha_orden = fecha_orden;
    hotelOrder.dias_contratados = dias_contratados;
    let hotelOrderModel = new HotelOrder(hotelOrder);
    await hotelOrderModel.save();
    res.json(hotelOrderModel);
});

route.get("/getHotelOrderById/:id", async(req, res) => {
    let data = await HotelOrder.findById(req.params.id).exec();
    res.json(data);
});

route.get("/getAllOrders", async(req, res) => {
    HotelOrder.find(function(err, orders) {
        if (err) return console.error(err);
        res.json(orders);
    })
});

route.get("/getHotelOrderByUser/:email", async(req, res) => {
    HotelOrder.find(function(err, orders) {
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
    await HotelOrder.deleteOne({ _id: `${req.params.Id}` }, (err) => {
        if (err) res.send("Could not delete")
        res.send("Element deleted");
    });
})

route.put("/modificaHotel/:usuario_email/:precio/:fecha_orden/:dias_contratados", async(req, res) => {
    await HotelOrder.updateOne({ _id: `${req.params.Id}` }, {
        usuario_email: `${req.params.usuario_email}`,
        precio: `${req.params.precio}`,
        fecha_orden: `${req.params.fecha_orden}`,
        dias_contratados: `${req.params.dias_contratados}`,
    }, (err) => {
        if (err) res.send("Could not update")
        res.send(`Element updated`);
    });
})

module.exports = route;