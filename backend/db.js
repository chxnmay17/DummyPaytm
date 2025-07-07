const { default: mongoose } = require('mongoose');


require('dotenv').config();
mongoose.connect(process.env.DB_URl)

const userSchema= new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
   
})
const user = mongoose.model('user',usersSchema)

module.exports = user;