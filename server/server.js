require('dotenv').config();

const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
// const jwt = require("jsonwebtoken");
// const myFirstSecret = process.env.FIRST_SECRET_KEY;
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));  
require('./config/mongoose.config');   
require('./routes/user.routes')(app);
require('./routes/chat.routes')(app);
require('./routes/message.routes')(app);
const port = 8000
const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});
const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});



io.on('connection', (socket) => {
    console.log('New user connected');
    console.log('socket id: ' + socket.id);

    socket.on('sendMessage', (message) => {
        io.emit('message', message); 
    });
    
    socket.on('newChatRoom', (chatRoom) => {
        io.emit('updateChatRooms', chatRoom);
    });

    // Handle user joining a chat room
    socket.on('joinChatRoom', (chatRoomId) => {
        // Logic to join the chat room
        // Emit an event to update the chat room list for all clients
        io.emit('updateChatRooms');
    });
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });




