const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});

const wss = new WebSocket.Server({ server });

let games = {};

wss.on('connection', function connection(ws) {
    console.log('A new player has connected');

    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);
        const data = JSON.parse(message);

        if (data.action === 'createGame') {
            const gameId = generateGameId();
            games[gameId] = {
                players: [ws],
                currentPlayer: 0,
                board: ['', '', '', '', '', '', '', '', '']
            };
            ws.send(JSON.stringify({ action: 'gameCreated', gameId }));
        } else if (data.action === 'joinGame') {
            const game = games[data.gameId];
            if (game && game.players.length === 1) {
                game.players.push(ws);
                game.players[0].send(JSON.stringify({ action: 'gameStarted', player: 'X' }));
                game.players[1].send(JSON.stringify({ action: 'gameStarted', player: 'O' }));
            }
        } else if (data.action === 'makeMove') {
            const game = games[data.gameId];
            if (game && game.players[game.currentPlayer] === ws) {
                const position = data.position;
                if (game.board[position] === '') {
                    game.board[position] = game.currentPlayer === 0 ? 'X' : 'O';
                    game.players.forEach(player => {
                        player.send(JSON.stringify({ action: 'updateBoard', board: game.board }));
                    });
                    const winner = checkWinner(game.board);
                    if (winner !== '') {
                        game.players.forEach(player => {
                            player.send(JSON.stringify({ action: 'gameOver', winner }));
                        });
                    } else {
                        game.currentPlayer = game.currentPlayer === 0 ? 1 : 0;
                    }
                }
            }
        }
    });
});

function generateGameId() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
}

function checkWinner(board) {
    // Check for winning conditions
    return '';
}

server.listen(8080, () => {
    console.log('Server running at https://gato.abdielaldana.com/');
});