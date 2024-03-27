const ChatController = require('../controllers/chat.controller')

module.exports = (app) => {
    app.post('/api/chats', ChatController.createChat);  
    app.get('/api/chats', ChatController.getAllChats)   
} 