const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userShcema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3, 'first name lenght must be 3 characters long.']
        },

        lastname : {
            type : String,
            minlength : [3, 'Last Name length must be 5 characters long']
        }
        },
    email : {
        type : String,
        required : true,
        unique : true
    },

    password : { 
        type : String ,
        required : true,
        select : false
    },
    socketIO : {type : String}
})

userShcema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token
}

userShcema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

userShcema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("user", userShcema);

module.exports = userModel