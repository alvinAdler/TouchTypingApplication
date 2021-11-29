const mongoose = require("mongoose")
const Schema = mongoose.Schema

const drillPerformanceSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    lesson: {
        type: String,
        required: true,
    },
    wordsPerMinute: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },
    totalOfWords: {
        type: Number,
        required: true
    },
    recordDate: {
        type: Date,
        required: true
    }
}, {versionKey: false})

const DrillPerformanceModel = mongoose.model("drillPerformance", drillPerformanceSchema)

module.exports = DrillPerformanceModel