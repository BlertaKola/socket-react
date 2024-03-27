const MessageController = require('../controllers/message.controller')

module.exports = (app) => {
    app.post('/api/messages', MessageController.createMessage);  
    app.get('/api/messages/:id', MessageController.getAllMessagesByChatID)   
} 