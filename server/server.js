const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();
           
app.use(cors());
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
        io.emit('message', message); // Broadcast the message to all connected clients
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });




