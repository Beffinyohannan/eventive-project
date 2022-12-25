const mongoose = require ('mongoose')

const notificationSchema=new mongoose.Schema({
    userId:String,
    notification:[
        {
            senderId:String,
            description:String,
            date:{
                type:Date,
                default:Date.now 
            }
        }
    ]
})

const Notification = mongoose.model('notification',notificationSchema)
module.exports = Notification