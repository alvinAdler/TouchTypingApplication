require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UsersModel = require("./models/usersModel")
const tokenAuthenticationMWare = require("./utilities/tokenAuthenticationMWare")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", (err) => console.error(err))
db.once("open", () => console.log("Connected to Databse"))

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "40s" })
}


app.post("/login", async (req, res) => {

    const user = await UsersModel.findOne({username: req.body.username})
    if(user == null){
        return res.status(400).json({
            message: "Can not find user",
            isLoggedIn: false
        })
    }

    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            //* Login success. Give access to the user.
            //* Creating the jwt

            const accessToken = generateAccessToken({_id: user._id, username: user.username})
            const refreshToken = jwt.sign({_id: user._id, username: user.username}, process.env.REFRESH_TOKEN)

            return res.status(200).json({
                message: "Logged in",
                user: {
                    id: user._id,
                    username: user.username
                },
                isLoggedIn: true,
                authToken: accessToken,
                refreshToken: refreshToken
            })
        }else{
            //* Login does not success (wrong password). Tell the user to re-login

            return res.status(400).json({
                message: "Credentials incorrect",
                isLoggedIn: false
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        })
    }
})

app.post("/register", async (req, res) => {

    const numOfUsers = await UsersModel.countDocuments({username: req.body.username})
    
    if(numOfUsers >= 1){
        res.status(400).json({
            message: "Username already exists. Please use another username"
        })
        return
    }

    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = {
            username: req.body.username,
            password: hashedPassword
        }

        UsersModel.create(user, (err, doc) => {
            if(err){
                return res.status(500).json({
                    message: err
                })
            }

            res.status(201).json({
                isRegistered: true,
                message: "Successfully registered user",
                user: doc
            })
        })
    }
    catch(err){
        res.status(500).json({
            message: `${err}`
        })
    }
})


app.listen(6000, () => console.log("Server started"))