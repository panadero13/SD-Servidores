const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

var connectDB = require('./DB/Connection');
var mongoose = require('mongoose');
const User = require("./DB/User");

const wss = new WebSocket.Server({ port: 3005 }, () => {
    connectDB();
    // insertUser('Luis Miguel Panadero', 'test@test.es', 1234567812345678, '11/21', '123', 1000)
    console.log('Listening...')
});

async function insertUser(name, email, card_number, card_date, card_cvc, credit) {
    console.log('Inserting user: ', name);
    let user = {};
    user.name = name;
    user.email = email;
    user.card_number = card_number;
    user.card_date = card_date;
    user.card_cvc = card_cvc;
    user.credit = credit;
    let userModel = new User(user);
    await userModel.save();
}

async function getUserByEmail(email) {
    var user = await User.findOne({ 'email': email }, function(err, user) {
        if (err) return console.error(err);
    });
    return user;
}

async function checkUsers(json_data) {
    var user = await getUserByEmail(json_data['email']);
    if (user != null && user.name == json_data['name'] &&
        user.card_number == json_data['card_number'] &&
        user.card_date == json_data['card_date'] &&
        user.card_cvc == json_data['card_cvc']
    ) {
        return user;
    }

    return null;
}

function checkCredit(user, cost) {
    return user.credit >= cost;
}

function substractCredit(user, cost) {
    final_credit = user.credit - cost;
    done = false;
    while (!done) {
        error = false;
        User.updateOne({ email: user.email }, {
            name: user.name,
            card_number: user.card_number,
            card_date: user.card_date,
            card_cvc: user.card_cvc,
            credit: final_credit
        }, (err) => {
            if (err) {
                error = true;
            }
        });
        if (error) continue;
        done = true;
        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        fs.appendFile(path.join(__dirname, 'Logs', 'logs.txt'),
            `${dateTime}: Nueva transaccion del usuario: ${user.name} con email ${user.email} con coste ${cost}.\n  El usuario tenia ${user.credit} y acabó con ${final_credit} \n`,
            function(err) {
                if (err) throw err;
            });
    }
}

async function returnCredit(email, cost) {
    user = await getUserByEmail(email);
    final_credit = +user.credit + +cost;
    done = false;
    while (!done) {
        error = false;
        User.updateOne({ email: email }, {
            name: user.name,
            card_number: user.card_number,
            card_date: user.card_date,
            card_cvc: user.card_cvc,
            credit: final_credit
        }, (err) => {
            if (err) {
                error = true;
            }
        });
        if (error) continue;
        done = true;
    }
    fs.appendFile(path.join(__dirname, 'Logs', 'logs.txt'),
        `ERROR: La transacción del usuario ${user.name} con email ${user.email} con coste ${cost} fue cancelada.\n  El usuario tenia ${user.credit} y acabó con ${final_credit} \n`,
        function(err) {
            if (err) throw err;
        });
}

wss.on('connection', ws => {
    console.log("New Client connected");

    ws.on('message', async(data) => {
        var json_data = JSON.parse(data);
        if (json_data['type'] == 'pay') {
            var user = await checkUsers(json_data);
            if (user != null) {
                var credit = checkCredit(user, json_data['cost']);
                if (credit) {
                    substractCredit(user, json_data['cost'])
                    ws.send(JSON.stringify({
                        'result': true,
                        'credit': true
                    }));
                } else {
                    ws.send(JSON.stringify({
                        'result': true,
                        'credit': false
                    }));
                }
            } else {
                ws.send(JSON.stringify({
                    'result': false,
                    'credit': false
                }));
            }
        } else if (json_data['type'] == 'cancel') {
            returnCredit(json_data['email'], json_data['cost'])
        }

    });

    ws.on('close', () => {
        console.log("User disconnected");
    })
});