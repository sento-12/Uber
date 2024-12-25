const captainModel = require("../models/captain.model")

module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    color, plate, capicity, vehicleType
}) =>{

console.log("Parameters received:", {
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capicity,
    vehicleType
});
if (!firstname || !email || !password || !color || !plate || !capicity || !vehicleType) {
    console.log("error is schema is not validet ======>>>>>>>>>>>>>")
    return { error: "Please provide all the required fields except for lastname." };
}

const captain = captainModel.create({
    fullname : {
        firstname,
        lastname,
    },
    email,
    password,
    vehicle : {
        color,
        plate,
        capicity,
        vehicleType
    }
})

return captain;

}