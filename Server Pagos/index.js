const WebSocket = require('ws');


const wss = new WebSocket.Server({ port: 3005 });

var user_data = [{
        'name': 'Luis Miguel Panadero',
        'email': 'test@test.es',
        'card_number': 1234567812345678,
        'card_date': "11/21",
        'card_cvc': "123",
        'credit': 1000
    },
    {
        'name': 'Nuria Serrano',
        'email': 'test2@test.es',
        'card_number': 2424242424242424,
        'card_date': "02/04",
        'card_cvc': "242",
        'credit': 5
    }
];

wss.on('connection', ws => {
    console.log("New Client connected");

    ws.on('message', (data) => {
        var json_data = JSON.parse(data);
        console.log(json_data);
        var final_user;
        user_data.forEach(user => {
            if (user['email'] == json_data['email'] &&
                user['card_number'] == json_data['card_number'] &&
                user['card_date'] == json_data['card_date'] &&
                user['card_cvc'] == json_data['card_cvc'] &&
                user['credit'] >= json_data['cost']) {
                ws.send(JSON.stringify({
                    'result': true
                }));
                user['credit'] -= json_data['cost'];
                final_user = user;
            }
        });
        ws.send(JSON.stringify({
            'result': false,
            user
        }));
    });

    ws.on('close', () => {
        console.log("User disconnected");
    })
});