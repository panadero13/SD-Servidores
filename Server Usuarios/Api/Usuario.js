const express = require("express");
const mongoose = require("mongoose");
const Usuario = require("../DB/Usuario");
const route = express.Router();

route.post("/postUsuario", async (req, res) => {
  let { username, password, email } = req.body;
  let usuario = {};
  usuario.username = username;
  usuario.password = password;
  usuario.email = email;
  let usuarioModel = new Usuario(usuario);
  await usuarioModel.save();
  res.json(usuarioModel);
});

route.get("/getAll", async (req, res) => {
  Usuario.find(function (err, usuarios) {
    if (err) return console.error(err);
    res.json(usuarios);
  });
});

route.get("/getUserById/:id", async (req, res) => {
  let data = await Usuario.findById(req.params.id).exec();
  res.json(data);
});

route.post("/findRegisteredUser", async (req,res)=>{
    let {username, password} = req.body;
    let data = []
    Usuario.find(function (err,usuarios) {
        if (err) return console.error(err);
        usuarios.forEach(user => {
          if(user.username == username && user.password == password){
            data.push(user);
          }
        })
        res.json(data);
      })
})

module.exports = route;
