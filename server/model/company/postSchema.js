const mongoose = require('mongoose')
const company = require('../company/companySchema')
// const User = require('../user/loginSchema');
const Company = require('../company/companySchema')
const User = require('../user/loginSchema')



const postSchema = mongoose.Schema({
    companyName:String,
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Company
    },
    description:String,
    image:String,
    status:{
        type:Boolean,
        default:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    eventType:String,
    likes:{
        type:Array,
        default:[]
    },
    comments:[
        {
            comment:{
                type:String
            },
            created:{
                type:Date,
                default:Date.now
            },
            postedBy:{
                type:String,
                ref:User
               
            },
            name:{
                type:String
            }

        }
    ],
    reports:[
        {
            reason:String,
            reportedBy:String,
            date:{
                type:Date,
                default:Date.now 
            }
        }
    ]

    
})

const post = mongoose.model('post',postSchema)
module.exports= post