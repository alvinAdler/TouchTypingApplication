const express = require("express")
const router = express.Router()
const SampleWords = require("../models/sampleWordsModel")

router.get("/", async (req, res) => {
    let numberOfWords = req.params.wordsNum

    try{
        const words = await SampleWords.find()
        res.status(200).json(...words)
    }
    catch(err){
        res.status(500).json({message: "Something went wrong"})
    }

    res.status(200).json({status: "Success", message: `The ID is: ${numberOfWords}`})
})

module.exports = router