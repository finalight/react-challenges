import express from 'express';
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
let player1 = true;
io.on('connection', function(socket) {
    socket.emit('gameOn', {
        game: gameBoard,
        player1: player1
    });

    socket.on('whatever', function(data) {
        gameBoard = data;
        player1 = !player1;
        console.log(gameBoard)
            //emit the gameboard back
        socket.broadcast.emit('anyhow', {
            game: gameBoard,
            player1: player1
        });
    });
});


app.use('/', express.static('public'));

server.listen(5000);
