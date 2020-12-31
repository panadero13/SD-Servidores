const express = require("express");
const mongoose = require("mongoose");
const Vuelo = require("../DB/Vuelo");
const route = express.Router();

route.post("/postVuelo", async (req, res) => {
  let { origen, destino, precio , hora, fecha } = req.body;
  let vuelo = {};
  vuelo.origen = origen;
  vuelo.destino = destino;
  vuelo.precio = precio;
  vuelo.hora = hora;
  vuelo.fecha = fecha;
  let vueloModel = new Vuelo(vuelo);
  await vueloModel.save();
  res.json(vueloModel);
});

route.get("/getVueloById/:id", async(req,res) =>{
  let data = await Vuelo.findById(req.params.id).exec();
  res.json(data);
});

route.get("/getAll", async (req,res) => {
  Vuelo.find(function (err, vuelos) {
    if (err) return console.error(err);
    res.json(vuelos);
  })
});

route.get("/getVueloByCiudad/:ciudad", async(req,res) =>{
  Vuelo.find(function (err,vuelos) {
    if (err) return console.error(err);
    var data = [];
    vuelos.forEach(vuelo => {
      if(vuelo.origen == req.params.ciudad || vuelo.destino == req.params.ciudad){
        data.push(vuelo);
      }
    })
    res.json(data);
  })
});

route.get("/getVueloByPrecio/:precio", async(req,res) =>{
  Vuelo.find(function (err,vuelos) {
    if (err) return console.error(err);
    var data = [];
    vuelos.forEach(vuelo => {
      if(vuelo.precio <= req.params.precio){
        data.push(vuelo);
      }
    })
    res.json(data);
  })
});

route.delete("/deleteById/:Id", async (req,res) =>{
  await Vuelo.deleteOne({_id: `${req.params.Id}`},(err)=>{
    if (err) res.send("Could not delete")
    res.send("Element deleted");
  });
})

route.put("/modificaVuelo/:Id/:origen/:destino/:precio", async (req, res)=>{
  await Vuelo.updateOne({ _id: `${req.params.Id}` }, { 
    origen: `${req.params.origen}`
  , destino: `${req.params.destino}`
  , precio: `${req.params.precio}`
  , hora: `${req.params.hora}`
  , fecha: `${req.params.fecha}`
  }, (err)=>{
    if (err) res.send("Could not update")
    res.send(`Element updated`);
  });
})

module.exports = route;
