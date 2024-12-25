const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First Name is too short."],
    },
    lastname: {
      type: String,
      minlength: [3, "Last Name is too short."],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  socketIO :{
    type : String
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      require: true,
      minlength: [3, "Color is too short."],
    },

    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate Number is too short."],
    },
    capacity: {
      type: Number,
      require: true,
      minlength: [1, "Capacity must be leaset 1 "],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },

  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn : "24h"})
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}


const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;

