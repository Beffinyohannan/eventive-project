const MessageModel = require('../model/chat/MessageSchema')

/* ----------------------------- adding messages ---------------------------- */

const addMessage = async(req,res)=>{
    try {
         const {chatId,senderId,text}=req.body
         const message = new MessageModel({
            chatId,senderId,text
         })
         const result = await message.save()
         res.status(200).json(result)
        
     } catch (error) {
        res.status(500).json(error)
     }
}

 /* ------------------------------ get messages ------------------------------ */

 const getMessages =async(req,res)=>{
     try {
        const {chatId}=req.params
        console.log(req.params);
        const result = await MessageModel.find({chatId})
        console.log(result);
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json(error)
    }
 }

module.exports ={
    addMessage,getMessages
}