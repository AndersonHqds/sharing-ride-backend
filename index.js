const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', () => {
  console.log('Client connected on websocket');
});

server.listen(PORT, () => {
  console.log(`Server is litening on port ${ PORT }`);
});
