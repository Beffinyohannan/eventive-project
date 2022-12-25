
require("dotenv").config();
const io = require('socket.io')(8800,{
    cors:{
        origin:process.env.FRONT_END
    }
})

let activeUsers=[]

io.on("connection",(Socket)=>{

    // add new user
    Socket.on('new-user-add',(newUserId)=>{
        // if user is not added previously
        if(!activeUsers.some((user)=>user.userId === newUserId)){
            activeUsers.push({
                userId:newUserId,
                socketId:Socket.id
            })
        }
        console.log("connected users",activeUsers);
        // console.log(users,'23456789');
        io.emit('get-users',activeUsers)
    })

    // send message
    Socket.on("send-message",(data)=>{
        const {receiverId} = data
        console.log(activeUsers,'///////////');
        const user = activeUsers.find((user)=> user.userId ==receiverId)
        console.log("sending from socket tp : ",receiverId);
        console.log("data",data);
        console.log(user,'werty');
        // console.log(user.socketId);
        if(user){
            io.to(user.socketId).emit("receive-message",data)
        }
    })

    /* ------------------------------ notification ------------------------------ */
    Socket.on("send-notification",(data)=>{
        const {receiverId,senderId,type} =data
        console.log(data,'ggggggggg');
        const user = activeUsers.find((user)=> user.userId ==receiverId)
        console.log(user,'1111111111111');
        io.to(receiverId?.socketId).emit("get-notification",data)
    })

    Socket.on("disconnect",()=>{
        activeUsers = activeUsers.filter((user)=> user.socketId  !== Socket.id)
        console.log("user disconnected",activeUsers);
        io.emit('get-users',activeUsers)
    })
})