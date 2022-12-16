const mongoose = require("mongoose")

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        validate: [validateEmail, 'Please fill a valid email address'],
        required: [true, "Email is required"],
        unique: true
    },
    phone: {
        type: Number,
        minlength: [10, "phone number must be 10 digits"],
        required: [true, "Phone number is required"]
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
    following:{
        type:Array,
        default:[]
    }
})





const User = mongoose.model('user', UserSchema);
module.exports = User;