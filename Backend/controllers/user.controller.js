const userModel = require("../models/user.model")
const userServices = require("../services/user.services");
const {validationResult} = require("express-validator")
const Blacklist = require("../models/blackList.model")


module.exports.registerUser = async (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {fullname, email, password} = req.body;
    const isUserExist = await userModel.findOne({email});
    if(isUserExist){
        return res.status(400).json({message : "User already exist"})
    }
    const hashPasssword = await userModel.hashPassword(password)

    const user = await userServices.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hashPasssword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token , user})
}

module.exports.loginUser = async (req, res, next) => {
 const error = validationResult(req);

 if (!error.isEmpty()) {
  return res.status(400).json({ errors: error.array() })
 } 

 const {email, password} = req.body;

 const user = await userModel.findOne({ email }).select('+password')
 
 if(!user){
     return res.status(401).json({message : "User not found"})
 }

 const isMatch = await user.comparePassword(password)

 if (!isMatch){
    return res.status(401).json({ message : "Invalid password"})
 }

 const token = user.generateAuthToken();
 res.cookie('token' , token)
 return res.status(200).json({token, user})
}

module.exports.getUserProfile = async (req, res, next)=>{
    return res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res, next)=>{
    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    await Blacklist.create({token})    

    res.status(200).json({message : "Logged out successfully"})
}