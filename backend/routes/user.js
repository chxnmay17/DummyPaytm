const express= require("express");
const router = express.Router();
const zod= require("zod");
const {User} =require("../db");
const jwt=require("jsonwebtoken");
require("dotenv").config();



const userSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
});


router.post("/signup",async(req,res)=>{
    try{
    const {success,data,error}=userSchema.safeParse(req.body);
    if(!success){
        res.json({
            msg:"Please put valid input"
        })
        return;
    }
    const found=await User.findOne({
        username:req.body.username
    })

    if(found){
        res.json({
            msg:"Email already taken"
        })
        return;
    }
    const user=await User.create(data);
    const userId=user._id;
    const token=jwt.sign({userId},process.env.JWT_SECRET)
    res.json({
        msg:"User created Successfully",
        token:token
    })}
    catch (err) {
        console.error(err); // Log the error for debugging purposes
        // Send a generic error message to the client without revealing sensitive details
        res.status(500).json({
          msg: "An error occurred while processing your request. Please try again later.",
        });
      }

})



module.exports=router;
