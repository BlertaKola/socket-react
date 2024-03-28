const Message = require('../models/message.model');   

module.exports.createMessage = (request, response) => {
    console.log(request.body)
    Message.create(request.body) 
        .then(mess => response.json(mess))
        .catch(err => response.status(400).json(err));
}


module.exports.getMessages = (request, response) => {
    // const chatID = request.body.chat
    Message.find({chat : request.params.id})
        .populate('user')
        .then(res => response.json(res))
        .catch(err => response.json(err))
}
