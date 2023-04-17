const app = require('./app')

const { createServer } = require('http')
const { Server } = require('socket.io')

const ChatService = require('./services/chatServices')
const chatServiceNew = new ChatService()

const httpServer = createServer(app);
const io = new Server(httpServer)


io.on('connection', async (socket) => {

    socket.emit('messages', await chatServiceNew.getAllMessages())
    
    
    socket.on('newMessage', async data => {
        await chatServiceNew.saveMessage(data);
        
        io.sockets.emit('messages', await chatServiceNew.getAllMessages())
    });
})

module.exports = { httpServer }