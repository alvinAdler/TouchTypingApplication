const mongoose = require("mongoose")
const Schema = mongoose.Schema

const gamePerformanceSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
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
    totalSeconds: {
        type: Number, 
        required: true
    },
    recordDate: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
}, {versionKey: false})

const GamePerformanceModel = mongoose.model("gamePerformance", gamePerformanceSchema)

module.exports = GamePerformanceModel 