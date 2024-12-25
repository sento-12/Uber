const dotenv = require("dotenv")
dotenv.config()
const  express = require('express')
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routers')
const captainRoutes = require("./routes/captain.routers")

connectToDb()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res)=>{
    res.send("Hello World")
})

app.use('/users', userRoutes)
app.use("/captain", captainRoutes)

module.exports = app;

