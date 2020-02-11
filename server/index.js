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

    clinet.on('reqSubscribe', function () {
        subscriber.subscribe('pubsub')
        clinet.emit("resSubscribe", { message: "subscribe success" })
    });

    clinet.on('reqUnsubscribe', () => {
        clinet.emit("resUnsubscribe", { message: "Unsubscribe success" })
        subscriber.unsubscribe('pubsub')
    })

    clinet.on('disconnect', () => subscriber.quit());
});

http.listen(3001, function () {
    console.log('listening on *:3001');
});


