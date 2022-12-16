const ChatModel = require("../model/chat/ChatSchema") 


/* ------------------------------- create chat ------------------------------ */

const createChat = async (req, res) => {
    try {
        const newChat = new ChatModel({
            members: [req.body.senderId, req.body.receiverId]
        })

        const result = await newChat.save()
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json(error)
    }
}

/* -------------------------------- user chat ------------------------------- */

const userChats =async(req,res)=>{
    try {
        // console.log(req.params.userId);
        const chat = await ChatModel.find({
            members:{$in:[req.params.userId]}
        })
        // console.log(chat);
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

/* -------------------------------- find chat ------------------------------- */

const findChat = async(req,res)=>{
    try {
        console.log(req.params.firsrId);
        console.log(req.params.secondId);
        const chat = await ChatModel.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        console.log(chat);
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createChat,
    userChats,findChat
}