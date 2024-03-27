const Message = require('../models/message.model');   

module.exports.createMessage = (request, response) => {
    Message.create(request.body) 
        .then(todo => response.json(todo))
        .catch(err => response.status(400).json(err));
}


module.exports.getAllMessagesByChatID = (request, response) => {
    Message.find({chat : request.params.chatId})
        .then(res => response.json(res))
        .catch(err => response.json(err))
}
