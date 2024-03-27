const User = require('../models/user.model');   

module.exports.createUser = (request, response) => {
    User.create(request.body) 
        .then(todo => response.json(todo))
        .catch(err => response.status(400).json(err));
}


module.exports.getAllUsers = (request, response) => {
    User.find()
        .then(res => response.json(res))
        .catch(err => response.json(err))
}
