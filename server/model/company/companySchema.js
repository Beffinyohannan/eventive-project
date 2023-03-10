const mongoose = require("mongoose");
const User = require("../user/loginSchema");

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Name is required"]
    },
    companyType: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        validate: [validateEmail, 'Please fill a valid email address'],
        required: [true, "Email is required"],
        unique: true
    },
    registerNo:{
        type: Number,
        required: [true, "register no. is required"]
    },
    phone: {
        type: Number,
        minlength: [10, "phone number must be 10 digits"],
        required: [true, "Phone number is required"]
    },
    companyAddress: {
        type: String,
        required: [true, "Name is required"]
    },
    password: {
        type: String,
        minlength: [6, "Password must contain 6 letters"],
        required: [true, "Password is required"]
    },
    status:{
        type:String,
        default:"Active"
    },
    followers:{
        type:Array,
        default:[]
    },
    profilePicture:{
        type:String,
        default:'https://drive.google.com/uc?export=view&id=1oDQnboZwPoRJ2Wm0Gh84g8RhnxjK-gXJ'
    },
    notification:[
        {
            senderId:{
                type:String,
                ref:User
            },
            description:String,
            date:{
                type:Date,
                default:Date.now 
            },
            status:{
                type:String,
                default:true
            }
        }
    ]
})





const company = mongoose.model('company', companySchema);
module.exports = company;