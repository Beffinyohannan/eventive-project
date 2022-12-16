const mongoose = require('mongoose')
const company = require('../company/companySchema')
const User = require('./loginSchema')


const EnquireSchema= mongoose.Schema({
    name:String,
    email:String,
    eventDate:Date,
    phone:Number,
    guestNumber:Number,
    eventType:String,
    budget:Number,
    address:String,
    food:String,
    venue:String,
    programme:String,
    light:String,
    guest:String,
    camera:String,
    anchor:String,
    other:String,
    notes:String,
    date:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:String,
        ref:User
    },
    companyId:{
        type:Array,
        ref:company
    },
    status:{
        type:String,
        default:'pending'
    }
})


const Enquire = mongoose.model('eventEnquire',EnquireSchema)
module.exports = Enquire