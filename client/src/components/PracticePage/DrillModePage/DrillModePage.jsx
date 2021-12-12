import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { FaPause } from 'react-icons/fa'
import axios from 'axios'
import swal from 'sweetalert2'
import Cookies from 'js-cookie'

import './DrillModePage_master.css'

import useKey from '../../Utilities/useKey'
import fingersMappingData from '../../Utilities/fingersMappingData'
import ScoreModal from '../../UtilityComponents/ScoreModal/ScoreModal'
import { keysArray, keysArrayHold } from '../../Utilities/keysArray'
import { 
    markLastVisitedPath, 
    getUserCookie, 
    changeTimeFormat, 
    changeAccuracyFormat ,
    grossWpm,
    capitalizeString
} from '../../Utilities/functions'

const DEVELOPER_MODE = true
const TIMER_INTERVAL = 1000 //ms

const DrillModePage = () => {

    const [listOfWords, setListOfWords] = useState("")
    const [userInput, setUserInput] = useState("")
    const [indicator, setIndicator] = useState(false)
    const [timer, setTimer] = useState(0)
    const [isShiftHold, setIsShiftHold] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const mainTextRef = useRef()
    const translateCounter = useRef(16)
    const currentLetter = useRef("")
    const indexTracker = useRef(0)
    const interval = useRef()
    const userInputCopy = useRef("")
    const timerCopy = useRef(1)

    const isStarted = useRef(false)
    const typingAccuracy = useRef(0)
    const errorCount = useRef(0)
    const wordsPerMinute = useRef(0)

    let isFalseDetected = false

    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        const onPageLoad = () => {

            markLastVisitedPath(location.pathname)

            axios({
                method: "GET",
                url: `http://localhost:5000/api/words/drillMode/${getUserCookie().practice.selection}`
            })
            .then((res) => {
                // let temp = res.data.words.split(" ").map((item) => capitalizeString(item)).join(" ")
                // temp = "\"$^ &&; !?,. 781 " + temp

                currentLetter.current = res.data.words[0]
                setListOfWords(res.data.words)

                // currentLetter.current = temp[0]
                // setListOfWords(temp)
            })
        }

        onPageLoad()
    }, [])

    useEffect(() => {
        if(DEVELOPER_MODE){
            return
        }
        if(listOfWords.length > 0){
            swal.fire({
                icon: "question",
                title: "Are you ready?",
                text: "Click the button below to begin the practice. The counter will start as soon as you type a letter",
                confirmButtonColor: "#2285e4",
                showCancelButton: true,
                cancelButtonColor: "#eb4034"
            })
            .then((res) => {
                if(res.isDenied || res.isDismissed){
                    history.push("/practice")
                }
            })
        }
    }, [listOfWords])

    useKey((ev, key) => {

        if(key === "Shift"){
            setIsShiftHold(!isShiftHold)
            return
        }

        if(!isStarted.current){
            isStarted.current = true
            startTimer()
        }

        if(key === currentLetter.current){

            setIndicator(false)

            userInputCopy.current = userInputCopy.current + key
            //* Then the words are over
            if(userInputCopy.current.length === listOfWords.length){
                console.log("Did I went here?")
                stopTimer()
                
                let currentNumOfLetters = userInputCopy.current.length === 0 ? 1 : userInputCopy.current.length
                typingAccuracy.current = errorCount.current === 0 ? 100 : 100 - ((errorCount.current / currentNumOfLetters) * 100).toFixed(1)

                wordsPerMinute.current = grossWpm(userInputCopy.current, timerCopy.current / 60)

                printFinalData()
                storeUserDrillPerformance()
                setShowModal(true)

                setUserInput((prev) => prev + key)
                return
            }

            indexTracker.current += 1

            mainTextRef.current.style.transform = `translateX(-${translateCounter.current}px)`
            translateCounter.current += 16

            currentLetter.current = listOfWords[indexTracker.current]

            setUserInput((prev) => prev + key)

        }
        else{
            if(!indicator){
                errorCount.current += 1
            }
            setIndicator(true)
        }
    })

    const startTimer = () => {
        interval.current = setInterval(evaluationFunction, TIMER_INTERVAL);
    }

    const stopTimer = () => {
        clearInterval(interval.current)
    }

    const evaluationFunction = () => {
        
        //* Check for typing accuracy
        let currentNumOfLetters = userInputCopy.current.length === 0 ? 1 : userInputCopy.current.length
        typingAccuracy.current = errorCount.current === 0 ? 100 : 100 - ((errorCount.current / currentNumOfLetters) * 100).toFixed(1)

        //* Check for wpm
        wordsPerMinute.current = grossWpm(userInputCopy.current, timerCopy.current / 60)

        setTimer((prevTimer) => prevTimer + 1)
        timerCopy.current += 1
    }

    const storeUserDrillPerformance = () => {
        const currentLesson = getUserCookie().practice.selection
        const finalWpm = wordsPerMinute.current
        const finalAccuracy = typingAccuracy.current
        const totalOfWords = parseInt(listOfWords.length / 5)
        const totalSeconds = timerCopy.current - 1

        axios({
            method: "POST",
            url: "http://localhost:5000/performance/store/drillMode",
            headers: {
                "Authorization": `Bearer ${Cookies.get("authorToken")}`,
                "Content-type": "application/json"
            },
            data: {
                lesson: currentLesson,
                wordsPerMinute: finalWpm,
                accuracy: finalAccuracy,
                totalOfWords: totalOfWords,
                totalSeconds: totalSeconds
            }
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err.response)
        })
    }

    const printFinalData = () => {
        const currentLesson = getUserCookie().practice.selection
        const finalWpm = wordsPerMinute.current
        const finalAccuracy = typingAccuracy.current
        const totalOfWords = parseInt(listOfWords.length / 5)
        const totalSeconds = timerCopy.current - 1

        console.log(`Current Lesson: ${currentLesson}`)
        console.log(`Final WPM: ${finalWpm}`)
        console.log(`Final Accuracy: ${finalAccuracy}`)
        console.log(`Total Words: ${totalOfWords}`)
        console.log(`Total Seconds: ${totalSeconds}`)
    }

    const defaultVariables = () => {
        translateCounter.current = 16
        indexTracker.current = 0
        userInputCopy.current = ""
        timerCopy.current = 1
        isStarted.current = false
        typingAccuracy.current = 0
        errorCount.current = 0
        wordsPerMinute.current = 0

        isFalseDetected = false
    }

    const restartDrill = () => {
        console.log("Game Restarted")

        axios({
            method: "GET",
            url: `http://localhost:5000/api/words/drillMode/${getUserCookie().practice.selection}`
        })
        .then((res) => {
            defaultVariables()
            mainTextRef.current.style.transform = `translateX(0px)`
            currentLetter.current = res.data.words[0]
            setListOfWords(res.data.words)

            setUserInput("")
            setIndicator(false)
            setTimer(0)
            setShowModal(false)
        })
    }

    const pauseDrill = () => {
        stopTimer()
        
        swal.fire({
            icon: "info",
            title: "Drill Paused!",
            text: "Hit the button below to resume the drill",
            confirmButtonColor: "#2285e4"
        })
        .then(() => {
            startTimer()
        })
    }

    return (
        <div className="drill-mode-container">
            <div className="drill-action-buttons">
                <button type="button" className="action-button" disabled={!isStarted.current} onClick={(ev) => {
                    ev.target.blur()
                    pauseDrill()
                }}><FaPause onClick={() => document.querySelector(".action-button").blur()}/></button>
            </div>
            <div className="word-wrapper">
                <p ref={mainTextRef} className="animated-text-container">
                    {listOfWords.split("").map((item, index) => {

                        if(userInput.charAt(index) === item && !isFalseDetected){
                            return <span className="word-true" key={index}>{item}</span>
                        }
                        else if(indexTracker.current === index){
                            if(indicator){
                                return(
                                    <span className="word-false current" key={index}>
                                        {item === " " ? 
                                        <span>&nbsp;</span>
                                        :
                                        item
                                        }    
                                    </span>
                                )
                            }

                            return <span className="current" key={index}>{item}</span>
                        }

                        return(
                            <span key={index}>{item}</span>
                        )
                    })}
                </p>
                <div className="pointer"></div>
            </div>
            <div className="text-hint-container">
                <span>
                    {(currentLetter.current !== "" && currentLetter.current !== undefined) &&
                        (fingersMappingData[currentLetter.current].isRequireShift && !isShiftHold ? 
                        "Left Hand/Right Hand, Little Finger"
                        : 
                        fingersMappingData[currentLetter.current.toLowerCase()].text)
                    }
                </span>
            </div>
            <div className="keyboard-wrapper">
                {Array.from(new Array(5)).map((item, indexOuter) => {
                    return(
                        <div key={indexOuter} className="keyboard-row utility-row">
                            {isShiftHold ?
                            keysArrayHold[indexOuter].map((item, indexInner) => {
                                return(
                                    <span key={indexInner} className={`${fingersMappingData[item].keyClassName} ${item === currentLetter.current && `key-image-current ${fingersMappingData[item].highlighted}`}`}>
                                        {item}
                                    </span>
                                )
                            })
                            :
                            keysArray[indexOuter].map((item, indexInner) => {
                                return(
                                    <span key={indexInner} 
                                    className={`${fingersMappingData[item].keyClassName} ${((item === currentLetter.current) || (fingersMappingData[currentLetter.current]?.isRequireShift && item === "Shift")) && 
                                    `key-image-current ${fingersMappingData[item].highlighted}`}`}>
                                        {item}
                                    </span>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <div className="typing-utilities">
                <div className="sub-utility">
                    <p>Timer</p>
                    <span>{changeTimeFormat(timer)}</span>
                </div>
                <div className="sub-utility">
                    <p>Words/Minute</p>
                    <span>{`${wordsPerMinute.current} wpm`}</span>
                </div>
                <div className="sub-utility">
                    <p>Accuracy</p>
                    <span>{changeAccuracyFormat(typingAccuracy.current)}</span>
                </div>
                <div className="sub-utility">
                    <p>Errors</p>
                    <span>{errorCount.current}</span>
                </div>
            </div>
            <ScoreModal 
            isModalActive={showModal} 
            isSuccess={true}
            onButtonClick= {{
                goReturn: () => history.push("/practice"),
                goTryAgain: restartDrill,
                goMain: () => history.push("/")
            }}    
            >
                <div className="drill-performance-result-container">
                    <div className="result-drill-container">
                        <h3>Speed</h3>
                        <p>{wordsPerMinute.current}<span className="performance-unit">wpm</span></p>
                    </div>
                    <div className="result-drill-container">
                        <h3>Accuracy</h3>
                        <p>{typingAccuracy.current}<span className="performance-unit">%</span></p>
                    </div>
                    <div className="result-drill-container">
                        <h3>Time</h3>
                        <p>{changeTimeFormat(timer)}</p>
                    </div>
                </div>
            </ScoreModal>
            {DEVELOPER_MODE && 
                <div className="developer-drill-tools">
                    {/* <button className="btn btn-primary" onClick={startTimer}>Start Timer</button> */}
                    <button className="btn btn-danger" onClick={stopTimer} disabled={!isStarted.current}>Stop Timer</button>
                    <button className="btn btn-primary" onClick={storeUserDrillPerformance}>Print Cookies</button>
                </div>
            }
        </div>
    )
}

export default DrillModePage