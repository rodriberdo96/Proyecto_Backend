const { MessageModel } = require ('../models/messageModel')
const logger = require('../utils/winston')


class ChatDao {

    async getAllMessages() {
        try {
            const messages = await MessageModel.find({})
            return messages
        } catch (error) {
            logger.error("Error in getAllMessages-DAO: " + error)
        }
    }

    async getMessagesByUser(email) {
        try {
            const messagesUser = await MessageModel.find({email:email})
            return messagesUser
        } catch (error) {
            logger.error("Error in getMessagesByUser-DAO: " + error)
        }  
    }

    async saveMessages(data){
        try {
            const saveMessage = await MessageModel(data).save()
            return saveMessage
        } catch (error) {
            logger.error("Error in saveMessages-DAO: " + error)
        }
    }
}

module.exports = ChatDao