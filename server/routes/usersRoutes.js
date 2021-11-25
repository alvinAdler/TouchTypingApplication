const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = express.Router()

// const UsersModel = require("../models/usersModel")
const tokenAuthenticationMWare = require("../utilities/tokenAuthenticationMWare")


router.get("/getUserIdentity", tokenAuthenticationMWare, (req, res) => {
    res.status(200).json({
        status: true,
        message: "User has been fetched successfully",
        user: req.user
    })
})

module.exports = router