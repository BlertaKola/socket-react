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


module.exports.getChatMessages = (request, response) => {
    const chatId = request.params.id; // Assuming chatId is passed as a parameter in the URL
    Message.find({ chat: chatId })
        .populate('user') // Assuming you want to populate the user details in the message
        .then(messages => {
            response.status(200).json(messages);
        })
        .catch(error => {
            console.error("Error fetching messages:", error);
            response.status(500).json({ error: "Internal server error" });
        });
};

module.exports.postMessages = (request, response) => {
    const { text, user, chat } = request.body; // Assuming text, user ID, and chat ID are provided in the request body
    const newMessage = new Message({
        text,
        user,
        chat
    });
    newMessage.save()
        .then(savedMessage => {
            response.status(201).json(savedMessage);
        })
        .catch(error => {
            console.error("Error posting message:", error);
            response.status(500).json({ error: "Internal server error" });
        });
};

module.exports.getChat = (request, response) => {
    const userId = request.body.user; 

    Chat.findById(request.params.id)
        .then(chat => {
            if (!chat) {
                return response.status(404).json({ error: "Chat not found" });
            }

            chat.users.push(userId);

            return chat.save();
        })
        .then(updatedChat => {
            response.json(updatedChat);
        })
        .catch(err => {
            response.status(500).json({ error: err.message });
        });
};