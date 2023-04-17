const express =  require('express')
const routesChat = express.Router()

const chatControllers = require('../controllers/chatController')
const chatController = new chatControllers()

const {verifyUserToken} = require('../middleware/tokenLogin')


routesChat.get('/', verifyUserToken, chatController.getAllMessages)
routesChat.get('/:email', verifyUserToken, chatController.getMessagesByUser)
routesChat.post('/', verifyUserToken, chatController.saveMessages)


module.exports = { routesChat }