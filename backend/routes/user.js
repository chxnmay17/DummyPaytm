const express= require("express");
const router = express.Router();
const zod= require("zod");
const {User} =require("../db");
const jwt=require("jsonwebtoken");
const authMiddleware=require("../middleware")
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

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateZodSchema= zod.object({
    password:zod.string().min(6).max(20).optional(),
    firstName:zod.string().min(3).max(20).trim().optional(),
    lastName:zod.string().min(6).max(20).trim().optional()
})
router.put("/",authMiddleware,async(req,res)=>{
    const {success}=updateZodSchema.safeParse(req.body);
    if(!success){
        return res.json({
            msg:"Not Authenticated"
        })
    
    }
    const updateDone=await User.updateOne({ _id: req.userId }, req.body);
    if(updateDone){
        return res.json({
            msg:"Updated Successfully"
        });
    }

})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports=router;
