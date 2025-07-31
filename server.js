const express = require('express');
const app=express();

const http=require('http').Server(app);

const port=process.env.PORT||3000;
app.use(express.static('public'));
http.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//socket

const io = require('socket.io')(http);


io.on('connection', (socket) => {
    console.log("connected");
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})