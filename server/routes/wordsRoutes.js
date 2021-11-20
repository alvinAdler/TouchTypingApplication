const express = require("express")
const router = express.Router()
const WordsModel = require("../models/wordsModel")

const randomInteger = (lowerBound, upperBound) => {
    return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound
}

const pictCharactersToWords = (quant, arrayOrigin, arrayDest) => {
    for(let num = 0; num < quant; num++){
        let temp = ""
        for(let innerNum = 0; innerNum < randomInteger(3, 4); innerNum++){
            temp += arrayOrigin[randomInteger(0, arrayOrigin.length - 1)]
        }
        arrayDest.push(temp)
    }
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
    
    const availableSelection = result[req.params.mode]
    let practiceSetupData = {}

    switch(req.params.mode){
        case "gameMode":
            practiceSetupData = availableSelection[req.params.selection]
            break;
        case "drillMode":
            practiceSetupData.words = []

            if(req.params.selection === "allKeys"){
                let allKeysArr = [...availableSelection["homeRow"], ...availableSelection["topRow"], ...availableSelection["bottomRow"], ...availableSelection["numberRow"]]
                pictCharactersToWords(50, allKeysArr, practiceSetupData.words)
            }
            else{
                pictCharactersToWords(50, availableSelection[req.params.selection], practiceSetupData.words)
            }
            practiceSetupData.words = practiceSetupData.words.join(" ")
            break;
    }

    res.status(200).json({...practiceSetupData})
})

module.exports = router