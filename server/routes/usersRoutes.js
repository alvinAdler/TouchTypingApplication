const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = express.Router()

const UsersModel = require("../models/usersModel")
const tokenAuthenticationMWare = require("../utilities/tokenAuthenticationMWare")


router.get("/getUsers", tokenAuthenticationMWare, (req, res) => {
    res.status(200).json({
        message: "Yeay you have made it!",
        user: req.user
    })
})

module.exports = router