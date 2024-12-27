const captainModel = require('../models/captain.model');
const {validationResult} = require("express-validator");
const captainServices = require("../services/captain.services")
const Blacklist = require("../models/blackList.model")

module.exports.registerCaptain = async (req, res, next)=>{
const error = validationResult(req); // express validator middleware function to validate

 if(!error.isEmpty()){
     // check for errors in the
     return res.status(400).json({errors:error.array()}) // return response with 400 status code and error array as json data object  in body of http request
 }

 const {fullname, email, password, vehicle} = req.body;
 const iscaptainExist = await captainModel.findOne({email})
 if(iscaptainExist){
    return res.status(400).json({message : "user already exist"})
 }
 const hashPasssword = await captainModel.hashPassword(password);

 const captain = await captainServices.createCaptain({
    firstname :    fullname.firstname,
    lastname :  fullname.lastname,
    email,
    password : hashPasssword,
    color : vehicle.color,
    plate :  vehicle.plate,
    capicity : vehicle.capicity,
    vehicleType :   vehicle.vehicleType,
 })
 console.log("captain object ===>>" + captain)
 const token = captain.generateAuthToken();

 return res.status(201).json({token, captain})

}

module.exports.loginCaptain = async (req, res, next)=>{
    const error = validationResult(req); // express validator middleware function to validate

 if(!error.isEmpty()){
     // check for errors in the
     return res.status(400).json({errors:error.array()}) // return response with 400 status code and error array as json data object  in body of http request
 }

 const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select("+password")

    if(!captain){
        return res.status(401).json({message : "captain is not found"})
    }

    const isMatch = await captain.comparePassword(password)

    if(!isMatch){ return res.status(400).json({message : "invalid password"})}

    const token = await captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token ,captain})

}

module.exports.getCaptainProfile = async (req, res, next)=>{
    return res.status(200).json(req.captain)
}

module.exports.logoutCaptain =async (req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    await Blacklist.create({token})
    res.clearCookie('token');

    res.status(200).json({message : "captain is successfully log out"})

}