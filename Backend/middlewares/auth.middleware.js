const jwt = require('jsonwebtoken');
const userModule = require('../models/user.model'); // Replace with the actual path to your user module
const Blacklist = require('../models/blackList.model');
const captainModel = require("../models/captain.model")


module.exports.authUser = async (req, res, next) => {
    try {
        // Extract token from Authorization header or cookies
        const authHeader = req.headers['authorization'];
        const token = authHeader
            ? authHeader.split(' ')[1] // Extract the token after "Bearer"
            : req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Token not found. Please authenticate." });
        }

        const isBlackList = await Blacklist.findOne({token : token})

        if(isBlackList){
            res.status(402).json({message : "Unauthorized."})
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID from the token
        const user = await userModule.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Attach user to request
        req.user = user;
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid token or authentication failed.", error: error.message });
    }
};

module.exports.authCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

        if(!token){
            return res.status(401).json({ message: "Token not found." })
        }

        const isBlackList = await Blacklist.findOne({token : token})

        if(isBlackList){
            return res.status(402).json({ message : "Unauthorized." })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decode", decode)
        const Captain =  await captainModel.findById(decode.id)
        console.log('Captain', Captain);
        req.captain = Captain;

        next()        
    } catch (error) {
        res.status(401).json({ message: "Invalid token or authentication failed.", error: error.message })
    }
}
