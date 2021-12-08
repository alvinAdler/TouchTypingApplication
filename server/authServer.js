require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UsersModel = require("./models/usersModel")
const RefreshTokensModel = require("./models/refreshTokensModel")
const tokenAuthenticationMWare = require("./utilities/tokenAuthenticationMWare")

const app = express()

app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", (err) => console.error(err))
db.once("open", () => console.log("Connected to Databse"))

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "2h" })
}

const pushRefreshToken = (refreshToken) => {
    RefreshTokensModel.create({
        refreshToken: refreshToken
    }, (err, doc) => {
        if(err){
            return({
                status: false,
                message: `${err}`
            })
        }

        return ({
            status: true,
            message: "Refresh token has been added to the database"
        })
    })
}

const isRefreshTokenExist = async (refreshToken) => {
    return await RefreshTokensModel.countDocuments({refreshToken: refreshToken}) < 1
}

const deleteRefreshToken = async (refreshToken) => {
    try{
        const deleteItemNum = await RefreshTokensModel.deleteMany({
            refreshToken: refreshToken
        })

        if(deleteItemNum === 0){
            return({
                status: false,
                message: "Refresh token does not exist"
            })
        }

        return({
            status: true,
            message: "Token has been successfully deleted"
        })
    }
    catch(err){
        return({
            status: false,
            message: `Something went wrong while deleting refresh token. ${err}`
        })
    }
}

app.post("/refreshToken", async (req, res) => {
    const refreshToken = req.body.refreshToken

    if(refreshToken == null){
        return res.status(401).json({
            message: "No access. You have not provided any refresh token"
        })
    }

    if(!isRefreshTokenExist(refreshToken)){
        return res.status(403).json({
            message: "No access. Refresh token is no longer valid"
        })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if(err){
            return res.status(403).json({
                message: "No access granted"
            })
        }

        const accessToken = generateAccessToken({username: user.username, _id: user._id})

        return res.status(200).json({
            message: "Here is your refreshed authorization token",
            authorToken: accessToken
        })
    })
})


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

            const refreshTokenStatus = pushRefreshToken(refreshToken)

            return res.status(200).json({
                message: "Logged in",
                user: {
                    id: user._id,
                    username: user.username
                },
                isLoggedIn: true,
                authToken: accessToken,
                refreshToken: refreshToken,
                isRefreshTokenPushed: refreshTokenStatus
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

app.post("/logout", async (req, res) => {
    const result = await deleteRefreshToken(req.body.refreshToken)

    if(!result.status){
        return res.status(500).json({
            status: result.status,
            message: result.message
        })
    }

    return res.status(200).json({
        status: result.status,
        message: result.message
    })
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

app.post("/verify", tokenAuthenticationMWare, (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Token is still valid"
    })
})


app.listen(5500, () => console.log("Server started"))