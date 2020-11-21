const express = require('express')
const router = express.Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
//bring in the schema
const User = require('../../models/User')
//registering user
//Routes POST /api/user
//desc register user
//access public
router.post('/',(req,res)=>{
    //get name, email and password from the body request
    const {name,email,password} = req.body;
    //simple validation to make sure they're not empty
    if(!name || !email || !password){
        return res.status(400).json({msg: "Please Enter all fields"})
    }
    //check for an existing user
    User.findOne({email})
    .then(user=>{
        if(user) return res.status(400).json({msg: "User Already exists"})
        //if the user does not exists, then go ahead and register the user
        const newUser = new User({
            name,
            email,
            password
        })
        //encrypt the password
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                newUser.password=hash;
                newUser.save() //this returns a promise
                    .then(user=>{
                        jwt.sign(
                            {id: user.id},
                            config.get('jwtSecret'),
                            {expiresIn: 3600},
                            (err,token)=>{
                                if(err) throw err
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
    })

    
})
module.exports = router