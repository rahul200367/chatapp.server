const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server( server,{
    cors:{
        origin:'https://65a80c0b90850a0c422b10a5--radiant-lebkuchen-a145f4.netlify.app/',
        methods:['GET','POST'],
    }
});
io.on('connection' ,(socket)=>{
    console.log(`A user is connected:${socket.id}`);
    socket.on('join_u' ,(data)=>{
        socket.join(data.room);
        console.log(`A user with userid : ${socket.id} joind a room :${data.room}`)
    });
    socket.on('sendmessage',(message)=>{
        console.log('message send to receive')
        socket.to(message.room).emit('receive',message);
    });
    socket.on('disconnected' ,(socket)=>{
        console.log("user disconnected");
    });
})
server.listen(3000, ()=>{
    console.log('server listeining to localhost:3000');
})
app.get('/',(req,res)=>{
   res.send(`<h1>hello server</h1>`)
})