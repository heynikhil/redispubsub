const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);
const redis = require('redis');

// const _redisClient = redis.createClient();

const redisClient = redis.createClient()
const users = {};

app.post('/subscribe', (req, res) => {
    const subscriber = redis.createClient();
    const { sName } = req.body;
    subscriber.subscribe(sName); //hi
    res.send({ message: `Thanks for subscribing ${sName}` })
})

app.post('/unsubscribe', (req, res) => {
    const subscriber = redis.createClient();
    const { sName } = req.body;
    subscriber.unsubscribe(sName);
    res.send({ message: "Unsubscribe success from ${sName}" })
})



/*
io.on('connection', function (clinet) {
    const subscriber = redis.createClient();
    const user = clinet.id
    console.log(user);
    
    subscriber.on("message", (channel, message) => {
        console.table([{ channel, message }]);
        clinet.send({ channel, message });
    });
    
    clinet.on('reqSubscribe', function (body) {
        const { sName } = body;
        users[user] = { [sName]: true };
        redisClient.set(user, JSON.stringify(users[user]), console.log)
        console.log(users);
        subscriber.subscribe(sName); //hi
        clinet.emit("resSubscribe", { message: `Thanks for subscribing ${sName}` })
    });

    clinet.on('reqUnsubscribe', (body) => {
        const { sName } = body;
        users[user] = { [sName]: false };
        redisClient.set(user, JSON.stringify(users[user]), console.log)
        console.log(users);
        clinet.emit("resUnsubscribe", { message: "Unsubscribe success from ${sName}" })
        subscriber.unsubscribe(sName)
    })

    clinet.on('disconnect', () => {
        delete users[user];
        redisClient.del(user, console.log)
        console.log(users);
        subscriber.quit();
    });
});
*/

http.listen(3001, function () {
    console.log('listening on *:3001');
});


