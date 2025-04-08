const User = require('../models/user');
const jwt = require('jsonwebtoken');

const userAuth = async (req,res,next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).send("Please Login!!")
        }
        const decodeObj = await jwt.verify(token,process.env.access_token);
        const { _id } = decodeObj
        const user = await User.findById(_id);
        if(!user){
            throw new Error("Error!! User not found!!")
        }
        req.user = user;
        next();
    }catch(err){
        res.status(400).send("Error:"+err.message);
    }
}
module.exports = {
    userAuth,
}