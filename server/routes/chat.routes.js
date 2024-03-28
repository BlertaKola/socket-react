const ChatController = require('../controllers/chat.controller')
const {authenticate} = require('../config/jwt.config')
module.exports = (app) => {
    app.post('/api/chats', ChatController.createChat);  
    app.get('/api/chats', ChatController.getAllChats);
    app.get('/api/chats/:id/messages', ChatController.getChatMessages);
    app.post('/api/chats/:id/messages', ChatController.postMessages)
    app.put('/api/chats/:id', ChatController.getChat)
} 