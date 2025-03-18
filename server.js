const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// When a user connects
io.on('connection', (socket) => {
    console.log('New user connected');

    // Send a message to the newly connected user
    socket.emit('message', 'Welcome to the chat room!');

    // Broadcast a message when a new user joins
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Listen for messages from clients
    socket.on('chatMessage', (msg) => {
        console.log('Message received:', msg);
        io.emit('message', msg);  // Broadcast message to all clients
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });
});

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
