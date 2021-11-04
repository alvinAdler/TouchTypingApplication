const mongoose = require("mongoose")
const Schema = mongoose.Schema

const wordsSchema = new Schema({
    gameMode: {
        type: Object,
        required: true
    },
    drillMode: {
        type: Object,
        required: true
    }
})

const WordsModel = mongoose.model("word", wordsSchema)

module.exports = WordsModel