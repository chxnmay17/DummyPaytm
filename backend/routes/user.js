const express= require("express");
const router = express.Router();



router.post("/signup",(req,res)=>{
    res.json({
        msg :"HEllo"
    })
})



module.exports=router;
