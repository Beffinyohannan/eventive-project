const mongoose = require('mongoose')
const company = require('./companySchema')


const eventSchema = mongoose.Schema({
    event:String,
    description:String,
    image:String,
    companyId:{
        type:String,
        ref:company
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Events = mongoose.model('event',eventSchema)
module.exports = Events