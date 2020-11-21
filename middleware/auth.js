//the purpose of this file is to take and pass the token
const config = require('config')
const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    //we're taking the header from the request header
    const token = req.header('x-auth-token')
    console.log(token)
    if(!token) return res.status(401).json({msg: "No token, access denied"})
    try {
        //verify the token,takes in the token and jwtoken
    const decoded = jwt.verify(token,config.get('jwtSecret'))
    //add user 
    req.user = decoded
    next()
    } catch (error) {
        res.status(400).json({msg: "Token not valid"})
    }
}
module.exports = auth;
