const mongoose = require("mongoose")
const Schema = mongoose.Schema

const gamePerformanceSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    recordDate: {
        type: Date,
        required: true
    }
}, {versionKey: false})

const GamePerformanceModel = mongoose.model("gamePerformance", gamePerformanceSchema)

module.exports = GamePerformanceModel 