const mongoose = require("mongoose")

const wordsSchema = new mongoose.Schema({
    words: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("SampleWords", wordsSchema)