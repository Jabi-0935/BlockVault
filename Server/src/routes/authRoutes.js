const express = require("express");
const router = express.Router();
const apicheck = require("../middleware/apicheck");
const {authMiddleware}=require('../middleware/authMiddleware')
const {User} = require('../model/User')
const {signup,login,profile} = require('../controllers/authController');



router.post("/signup", apicheck, async (req, res) => {
    try{
        await signup(req,res);
    }catch(err){
        res.status(500).json({ error: err.message })
        console.log(err);
    }
});

router.post('/login',apicheck,async (req,res)=>{
    try{
       await login(req,res);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: err.message || "Server error" });
    }
})

router.get('/profile', authMiddleware, async (req, res) => {
    try{
        return profile(req,res);
    }catch(err){
        res.status(500).json({error:"Internal Server Error"})
    }
});


module.exports = router;
