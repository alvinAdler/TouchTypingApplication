const express = require("express")
const bcrypt = require("bcrypt")

const router = express.Router()

const UsersModel = require("../models/usersModel")

router.post("/login", async (req, res) => {

    const user = await UsersModel.findOne({username: req.body.username})
    if(user == null){
        return res.status(400).json({
            message: "Can not find user"
        })
    }

    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            return res.status(200).json({
                message: "Logged in",
                user: user
            })
        }else{
            return res.status(400).json({
                message: "Credentials incorrect"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: `${err}`
        })
    }

    res.status(200).json(user)
})

router.post("/register", async (req, res) => {

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

module.exports = router