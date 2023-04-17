const ChatService = require('../services/chatServices')
const chatServiceNew = new ChatService()

class chatControllers {

    async getAllMessages(req, res) {
        try {
            const allMessages = await chatServiceNew.getAllMessages()
            res.status(200).json(allMessages)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getMessagesByUser(req, res) {
        try {
            const user = req.params.email
            const userMessages = await chatServiceNew.getMessagesByUser(user)
            res.status(200).json(userMessages)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async saveMessages(req, res) {
        try {
            const email = req.email
            const newMsj = await chatServiceNew.saveMessages(req.body, email) 
            res.status(200).json(newMsj)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = chatControllers