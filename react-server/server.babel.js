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
let playerCount = 0;
io.on('connection', function(socket) {
    playerCount++;

    if (playerCount <= 2) {
        socket.join("room1")
    }

    socket.to('room1').emit('gameOn', {
        game: gameBoard,
        player1: player1
    });

    socket.to('room1').on('whatever', function(data) {
        gameBoard = data;
        player1 = !player1;
        console.log(gameBoard)
            //emit the gameboard back
        socket.broadcast.to('room1').emit('anyhow', {
            game: gameBoard,
            player1: player1
        });
    });
});


app.use('/', express.static('public'));

server.listen(5000);
