const { default: mongoose, SchemaType } = require('mongoose');


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

const accountSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Accounts= mongoose.model('Accounts',accountSchema)
module.exports = {User,Accounts};