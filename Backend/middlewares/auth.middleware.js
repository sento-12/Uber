const jwt = require('jsonwebtoken');
const userModule = require('../models/user.model'); // Replace with the actual path to your user module
const Blacklist = require('../models/blackList.model');


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

        const isBlackList = await userModule.findOne({token : token})

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
