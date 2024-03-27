const Chat = require('../models/chat.model');   

module.exports.createChat = (request, response) => {
    Chat.create(request.body) 
        .then(todo => response.json(todo))
        .catch(err => response.status(400).json(err));
}


module.exports.getAllChats = (request, response) => {
    Chat.find()
        .then(res => response.json(res))
        .catch(err => response.json(err))
}
