const express = require("express")
const router = express.Router()
const WordsModel = require("../models/wordsModel")

const randomInteger = (lowerBound, upperBound) => {
    return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound
}

router.get("/:mode/:selection", async (req, res) => {

    const validModes = ["gameMode", "drillMode"]
    const validSelections = ["easy", "medium", "hard", "topRow", "homeRow", "bottomRow", "numberRow", "allKeys"]

    if(!validModes.includes(req.params.mode)){
        res.status(400).json({message: "Mode invalid. Mode must be either 'gameMode' or 'drillMode'"})
        return
    }

    if(!validSelections.includes(req.params.selection)){
        res.status(400).json({message: "Selection invalid. Selection must be either 'easy', 'medium', 'hard', 'topRow', 'homeRow', 'bottomRow', 'numberRow', or 'allKeys'"})
        return
    }

    const result = await WordsModel.findOne({}, {[`${req.params.mode}`]: 1})

    const availableSelection = result[req.params.mode][req.params.selection]
    let selectedWords = []

    switch(req.params.mode){
        case "gameMode":
            selectedWords = [...availableSelection]
            break;
        case "drillMode":
            if(req.params.selection === "allKeys"){
                /* TODO
                    AllKeys was supposed to be either keys from all rows or some sentences. Change this later.
                */
                selectedWords = [...availableSelection]
                break;
            }
            for(let num=0; num<50; num++){
                let temp = ""
                for(let num=0; num < randomInteger(3, 4); num++){
                    temp += availableSelection[randomInteger(0, availableSelection.length - 1)]
                }
                selectedWords.push(temp)
            }
            break;
    }

    res.status(200).json({result: selectedWords})
})

module.exports = router