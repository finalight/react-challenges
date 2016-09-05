import express from 'express';
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const async = require('async');

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

    if (playerCount == 1) {
        player1ID = socket.id;
        console.log("assign to player 1")
    } else if (playerCount == 2) {
        player2ID = socket.id;
        console.log("assign to player 2")
    }

    console.log(playerCount)

    if (playerCount <= 2) {
        socket.join("room1")
    }

    if (playerCount == 1) {
        socket.to(player1ID).emit('assignTurn', {
            player1: player1,
            playerID: player1ID,
            player2ID: player2ID
        });
    } else if (playerCount == 2) {
        socket.to(player2ID).emit('assignTurn', {
            player1: !player1,
            playerID: player2ID,
            player2ID: player2ID
        });
    }

    socket.to("room1").emit('gameOn', {
        game: gameBoard,
    });


    socket.on('disconnect', function() {
        playerCount--;

        if (playerCount <= 0) {
            gameBoard = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
        }

        if (playerCount == 1) {
            player2ID = null;
            console.log("removing player 2")
        } else if (playerCount == 0) {
            player1ID = null;
            console.log("removing player 1")
        }
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

    app.get("/", function(req, res) {
        socket.broadcast.to(player2ID).emit('assignTurn', {
            player1: !player1,
            playerID: player2ID,
            player2ID: player2ID
        });
        socket.broadcast.to(player1ID).emit('assignTurn', {
            player1: player1,
            playerID: player1ID,
            player2ID: player2ID
        });
        res.send("hah")
    });
});


app.use('/haha', express.static('public'));
server.listen(5000);
