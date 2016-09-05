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
let player1ID = null;
let player2ID = null;
io.on('connection', function(socket) {
    playerCount++;

    if (player1ID == null) {
        player1ID = socket.id;
    } else if (player2ID == null) {
        player2ID = socket.id;
    }

    console.log(playerCount)
    socket.join("room1")

    socket.to("room1").emit('gameOn', {
        game: gameBoard,
    });

    socket.broadcast.to(player1ID).emit('assignTurn', {
        player1: player1
    });

    socket.broadcast.to(player2ID).emit('assignTurn', {
        player1: !player1
    });

    socket.on('disconnect', function() {
        playerCount--;
        console.log(playerCount)
    });
    socket.on('whatever', function(data) {
        gameBoard = data;
        player1 = !player1;
        console.log(gameBoard)
            //emit the gameboard back
        socket.broadcast.to("room1").emit('anyhow', {
            game: gameBoard,
            player1: player1
        });
    });
});


app.use('/', express.static('public'));

server.listen(5000);
