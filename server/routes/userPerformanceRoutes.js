const express = require("express")
const router = express.Router()

const DrillPerformanceModel = require("../models/drillPerformanceModel")
const GamePerformanceModel = require("../models/gamePerformanceModel")

const tokenAuthenticationMWare = require("../utilities/tokenAuthenticationMWare")

const comparisonDate = (obj1, obj2) => {
    if(obj1.recordDate < obj2.recordDate){
        return 1
    }
    else if(obj1.recordDate > obj2.recordDate){
        return -1
    }
    return 0
}

const findAverage = (arr) => {
    const accumulation = arr.reduce((total, item) => {
        return total + item
    }, 0)

    return accumulation / arr.length
}

router.post("/store/:mode", tokenAuthenticationMWare, (req, res) => {
    const currentMode = req.params.mode

    switch(currentMode){
        case "gameMode":

            const gamePerformanceDetails = {
                userId: req.user._id,
                difficulty: req.body.difficulty,
                score: req.body.score,
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
                userId: req.user._id,
                lesson: req.body.lesson,
                wordsPerMinute: req.body.wordsPerMinute,
                accuracy: req.body.accuracy,
                totalOfWords: req.body.totalOfWords,
                totalSeconds: req.body.totalSeconds
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
        
        default: 
            return res.status(400).json({
                message: "Your mode is invalid. Mode must be either `gameMode` or `drillMode`"
            })  
    }
})

router.get("/get/:mode", tokenAuthenticationMWare, async (req, res) => {
    const currentMode = req.params.mode

    switch(currentMode){
        case "gameMode":

            const allGamePerformance = await GamePerformanceModel.find({userId: req.user._id})

            if(allGamePerformance.length < 1){
                return res.status(200).json({
                    isEmpty: true,
                    message: "No record for this game mode"
                })
            }

            // const allScores = allGamePerformance.map((obj) => obj.score)

            let lastTenGames = allGamePerformance.slice().sort(comparisonDate).slice(0, 10)
            lastTenGames = lastTenGames.map((obj) => ({
                difficulty: obj.difficulty,
                score: obj.score,
                recordDate: obj.recordDate
            }))

            const lastTenScores = lastTenGames.map((obj) => obj.score)

            const maxScore = Math.max.apply(Math, lastTenScores)
            const minScore = Math.min.apply(Math, lastTenScores)
            
            const scoreAverage = findAverage(lastTenScores).toFixed(1)
            
            return res.status(200).json({
                message: "Game mode data fetched successfully",
                result: {
                    lastTenGames,
                    summary: {
                        maxScore,
                        minScore,
                        scoreAverage
                    }
                }
            })
            
        case "drillMode":
            
            const allDrillPerformance = await DrillPerformanceModel.find({userId: req.user._id})

            if(allDrillPerformance.length < 1){
                return res.status(200).json({
                    isEmpty: true,
                    message: "No record for drill mode"
                })
            }

            // const allDrillWpms = allDrillPerformance.map((obj) => obj.wordsPerMinute)
            // const allDrillAccs = allDrillPerformance.map((obj) => obj.accuracy)
            // const allDrillTimes = allDrillPerformance.map((obj) => obj.totalSeconds)
            
            let lastTenDrills = allDrillPerformance.slice().sort(comparisonDate).slice(0, 10)
            lastTenDrills = lastTenDrills.map((obj) => ({
                accuracy: obj.accuracy,
                lesson: obj.lesson,
                recordDate: obj.recordDate,
                totalOfWords: obj.totalOfWords,
                totalSeconds: obj.totalSeconds,
                wordsPerMinute: obj.wordsPerMinute
            }))

            const lastTenDrillsWPM = lastTenDrills.map((obj) => obj.wordsPerMinute)
            const lastTenDrillsAcc = lastTenDrills.map((obj) => obj.accuracy)
            const lastTenDrillsTimes = lastTenDrills.map((obj) => obj.totalSeconds)

            const maxWpm = Math.max.apply(Math, lastTenDrillsWPM)
            const minWpm = Math.min.apply(Math, lastTenDrillsWPM)
            const maxAcc = Math.max.apply(Math, lastTenDrillsAcc)
            const minAcc = Math.min.apply(Math, lastTenDrillsAcc)
            const fastestTime = Math.min.apply(Math, lastTenDrillsTimes)
            const slowestTime = Math.max.apply(Math, lastTenDrillsTimes)

            const averageWpm = findAverage(lastTenDrills.map((item) => item.wordsPerMinute)).toFixed(1)
            const averageAcc = findAverage(lastTenDrills.map((item) => item.accuracy)).toFixed(1)
            const averageTime = findAverage(lastTenDrills.map((item) => item.totalSeconds)).toFixed(1)

            return res.status(200).json({
                message: "Drill mode data fetched successfully",
                result: {
                    lastTenDrills,
                    summary: {
                        maxWpm,
                        minWpm,
                        maxAcc,
                        minAcc,
                        fastestTime,
                        slowestTime,
                        averageWpm,
                        averageAcc,
                        averageTime
                    }
                }
            })

        default: 
            return res.status(400).json({
                message: "Your mode is invalid. Mode must be either `gameMode` or `drillMode`"
            })
    }
})

module.exports = router