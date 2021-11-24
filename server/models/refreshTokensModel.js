const mongoose = require("mongoose")
const Schema = mongoose.Schema

const refreshTokensSchema = new Schema({
    refreshToken: {
        type: String,
        required: true
    }
}, {versionKey: false})

const RefreshTokensModel = mongoose.model("refreshTokens", refreshTokensSchema)

module.exports = RefreshTokensModel