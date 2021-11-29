const express = require("express")
const router = express.Router()

const DrillPerformanceModel = require("../models/drillPerformanceModel")
const GamePerformanceModel = require("../models/gamePerformanceModel")

const tokenAuthenticationMWare = require("../utilities/tokenAuthenticationMWare") 

router.post("/sampleDataPost", (req, res) => {
    const currentMode = req.body.mode

    switch(currentMode){
        case "gameMode":

            const gamePerformanceDetails = {
                userId: req.body.userId,
                difficulty: req.body.difficulty,
                score: req.body.score,
                recordDate: Date.now()
            }

            GamePerformanceModel.create(gamePerformanceDetails, (err, doc) => {
                if(err){
                    return res.status(500).json({
                        message: err
                    })
                }

                return res.status(201).json({
                    isAdded: true,
                    message: "Successfully added performance of game mode",
                    doc: doc
                })
            })

            break;
        case "drillMode":

            const drillPerformnaceDetails = {
                userId: req.body.userId,
                lesson: req.body.lesson,
                wordsPerMinute: req.body.wordsPerMinute,
                accuracy: req.body.accuracy,
                totalOfWords: req.body.totalOfWords,
                recordDate: Date.now()
            }

            DrillPerformanceModel.create(drillPerformnaceDetails, (err, doc) => {
                if(err){
                    return res.status(500).json({
                        message: err
                    })
                }

                return res.status(201).json({
                    isAdded: true,
                    message: "Successfully added performance of drill mode",
                    doc: doc
                })
            })

            break;
    }
})

router.get("/sampleDataGet", async (req, res) => {
    const currentMode = req.body.mode

    switch(currentMode){
        case "gameMode":

            const resultGamePerformance = await GamePerformanceModel.find()

            return res.status(200).json({
                message: "Game mode data fetched successfully",
                result: result
            })

            break;

        case "drillMode": 

            const resultDrillPerformance = await DrillPerformanceModel.find()

            return res.status(200).json({
                message: "Drill mode data fetched successfully",
                result: result
            })

        default: 
            return res.status(400).json({
                message: "Your mode is invalid. Mode must be either `gameMode` or `drillMode`"
            })
    }
})

module.exports = router