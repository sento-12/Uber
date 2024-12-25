const express = require("express")
const router = express.Router()
const {body} = require("express-validator")
const captainController = require("../controllers/captain.controller")


router.post("/register", [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min :3}).withMessage("Full Name is too short less than 3 "),
    body('password').isLength({min :3}) .withMessage("Password must be at least 6 characters long"),
    body('vehicle.color').isLength({min :3}).withMessage("Vehicle Color is too short less than 3 "),
    body('vehicle.plate').isLength({min :3}).withMessage("Vehicle Plate is too short less than 3 "),
    body('vehicle.capicity').isInt({min : 1}).withMessage("Vehicle Capicity must be an integer greater than or equal to 1"),
    body('vehicle.vehicleType').isIn(["car","motorcycle", "auto"]).withMessage("Invalid Vehicle Type")
], captainController.registerCaptain)

module.exports = router;