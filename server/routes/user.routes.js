const UserController = require('../controllers/user.controller')

module.exports = (app) => {
    app.post('/api/users', UserController.createUser);  
    app.get('/api/users', UserController.getAllUsers)   
} 