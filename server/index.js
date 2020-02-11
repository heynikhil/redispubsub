const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);
const redis = require('redis');

io.on('connection', function (clinet) {
    const subscriber = redis.createClient();

    subscriber.on("message", (channel, message) => {
        console.table([{ channel, message }]);
        clinet.send(message);
    });

    clinet.on('reqSubscribe', function (body) {
        const { sName } = body
        subscriber.subscribe(sName)
        clinet.emit("resSubscribe", { message: "subscribe success" })
    });

    clinet.on('reqUnsubscribe', (body) => {
        const { sName } = body
        clinet.emit("resUnsubscribe", { message: "Unsubscribe success" })
        subscriber.unsubscribe(sName)
    })

    clinet.on('disconnect', () => subscriber.quit());
});

http.listen(3001, function () {
    console.log('listening on *:3001');
});


