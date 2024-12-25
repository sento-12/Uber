const userModel = require("../models/user.model");

module.exports.createUser = async({firstname, lastname, email, password})=>{
    if(!email || !password || !firstname){
        return {error: "Please provide all the required fields."}
    }

    const user = userModel.create({
        fullname : {
            firstname,
            lastname
        },
        email,
        password
    })

    return user
}