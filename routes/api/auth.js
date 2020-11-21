const express =  require('express')
const router = express.Router()
const jwt= require('jsonwebtoken')
const config= require('config')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const auth = require('../../middleware/auth')
router.post('/',(req,res)=>{
    const {password,email}=req.body;
    if(!email || !password){
        return res.status(400).json({msg: "Enter All fields"})
    }
    User.findOne({email})
        .then(user=>{
            if(!user) return res.status(400).json({msg: "User does not exist"})

            bcrypt.compare(password,user.password)
            .then(isMatch=>{
                if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"})

                jwt.sign(
                    {id: user.id},
                    config.get('jwtSecret'),
                    {expiresIn: 3600},
                    (err,token)=>{
                        if(err) throw err;
                        res.json({
                            token,
                            user:{
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )
            })
        })
})
//to get the user that is currently logged in
//route /api/auth/user
//desc get the user that is logged in
//access private
router.get('/user',auth, (req,res)=>{
    User.findById(req.user.id)
    .select('-password') //we're getting the user data minus the password
    .then(user=>{
        if(!user) throw Error("User does not exists")
        res.json(user)
    })
})
module.exports= router