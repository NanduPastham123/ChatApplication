const path = require('path')
const http =  require('http')
const express = require('express')
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//Set static folder
app.use(express.static(path.join(__dirname,'public')))

//Run when client connects
io.on('connection', (socket) => {
    console.log('New WebSocket Connection...')
    
    //Welcome Current User
    socket.emit('message', 'welcome to Chatcord')

    //Broadcast when a user connects
    socket.broadcast.emit('message','A user has joined the chat');

    //Runs when client disconnects
    socket.on('disconnect',() =>{
        io.emit('message', 'A user has left the chat')
    })

   //Listen for chatMessage
   socket.on('chatMessage', (msg)=>{
    io.emit('message',msg)
    console.log("ChatMessage:",msg)
   })
})
const PORT = 3000 
//|| process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))