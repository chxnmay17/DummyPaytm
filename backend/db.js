const { default: mongoose } = require('mongoose');


require("dotenv").config();
mongoose.connect(process.env.DB_URl)

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:30
    },
    firstName:{
        type:String,
        trim:true,
        minLength:3,
        maxLength:15,
    },
    lastName:{
        type:String,
        trim:true,
        minLength:3,
        maxLength:15
    }
   
})
const User = mongoose.model('User',userSchema)

module.exports = {User};