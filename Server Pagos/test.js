const WebSocket = require('ws');
const ws = new WebSocket("ws://localhost:3005");

ws.addEventListener('open', () => {
    ws.send(JSON.stringify({
        'user': 'Luis Miguel',
        'card': 3334466
    }));
})