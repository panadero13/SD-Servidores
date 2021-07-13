const express = require("express");
const mongoose = require("mongoose");
const Hotel = require("../DB/Hotel");
const route = express.Router();

route.post("/postHotel", async(req, res) => {
    let { server_id, nombre, ciudad, tipo_habitacion, capacidad_personas, camas, precio_dia, disponible, stock } = req.body;
    let hotel = {};
    hotel.server_id = server_id;
    hotel.nombre = nombre;
    hotel.ciudad = ciudad;
    hotel.precio_dia = precio_dia;
    hotel.disponible = disponible;
    hotel.tipo_habitacion = tipo_habitacion;
    hotel.capacidad_personas = capacidad_personas;
    hotel.camas = camas;
    hotel.stock = stock;
    let hotelModel = new Hotel(hotel);
    await hotelModel.save();
    res.json(hotelModel);
});

route.get("/getHotelById/:id", async(req, res) => {
    let data = await Hotel.findById(req.params.id).exec();
    res.json(data);
});

route.get("/getAll", async(req, res) => {
    Hotel.find(function(err, hoteles) {
        if (err) return console.error(err);
        res.json(hoteles);
    })
});

route.get("/getHotelByCiudad/:ciudad", async(req, res) => {
    Hotel.find(function(err, hoteles) {
        if (err) return console.error(err);
        var data = [];
        hoteles.forEach(hotel => {
            if (hotel.ciudad == req.params.ciudad) {
                data.push(hotel);
            }
        })
        res.json(data);
    })
});

route.get("/getHotelByPrecio/:precio", async(req, res) => {
    Hotel.find(function(err, hoteles) {
        if (err) return console.error(err);
        var data = [];
        hoteles.forEach(hotel => {
            if (hotel.precio_dia <= req.params.precio) {
                data.push(hotel);
            }
        })
        res.json(data);
    })
});

route.delete("/deleteById/:Id", async(req, res) => {
    await Hotel.deleteOne({ _id: `${req.params.Id}` }, (err) => {
        if (err) res.send("Could not delete")
        res.send("Element deleted");
    });
})

route.put("/modificaHotel/:Id/:server_id/:nombre/:ciudad/:precio_dia/:plazas/:disponible/:tipo_habitacion/:capacidad_personas/:camas/:stock",
    async(req, res) => {
        await Hotel.updateOne({ _id: `${req.params.Id}` }, {
            server_id: `${req.params.server_id}`,
            nombre: `${req.params.nombre}`,
            ciudad: `${req.params.ciudad}`,
            precio_dia: `${req.params.precio_dia}`,
            plazas: `${req.params.plazas}`,
            disponible: `${req.params.disponible}`,
            tipo_habitacion: `${req.params.tipo_habitacion}`,
            capacidad_personas: `${req.params.capacidad_personas}`,
            camas: `${req.params.camas}`,
            stock: `${req.params.stock}`,
        }, (err) => {
            if (err) res.send("Could not update")
            res.send(`Element updated`);
        });
    })

route.put("/modificaStock/:Id/:qty", async(req, res) => {
    await Hotel.updateOne({ _id: `${req.params.Id}` }, {
        stock: `${req.params.qty}`,
    }, (err) => {
        if (err) res.send("Could not update")
        res.send(`Element updated`);
    });
})

module.exports = route;