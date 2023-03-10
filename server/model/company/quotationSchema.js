const mongoose = require('mongoose')
const Enquire = require('../user/eventEnquire')
const User = require('../user/loginSchema')
const company = require('./companySchema')

const QuotaionSchema= mongoose.Schema({
    foodAmount:String,
    venueAmount:String,
    programmeAmount:String,
    lightAmount:String,
    guestAmount:String,
    cameraAmount:String,
    anchorAmount:String,
    note:String,
    username:String,
    companyId:{
        type:String,
        ref:company
    } ,
    userId:{
        type:String,
        ref:User
    },
    status:{
        type:String,
        default:"pending"
    },
    date:{
        type:Date,
        default:Date.now
    },
    enquiryId:{
        type:String,
        ref:Enquire
    }
})


const Quotation = mongoose.model('eventQuotation',QuotaionSchema)
module.exports = Quotation