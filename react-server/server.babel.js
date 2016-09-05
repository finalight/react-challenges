import express from 'express';
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
io.on('connection', function(socket) {
    socket.emit('gameOn', gameBoard);
    socket.on('whatever', function(data) {
        gameBoard = data;
        console.log(gameBoard)
        //emit the gameboard back
       
    });
     socket.emit('anyhow', gameBoard);
});


app.use('/', express.static('public'));

server.listen(5000);
