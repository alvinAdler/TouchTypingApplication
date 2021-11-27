import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert2'

import './DrillModePage_master.css'

import useKey from '../../Utilities/useKey'
import fingersMappingData from '../../Utilities/fingersMappingData'
import keysArrary from '../../Utilities/keysArray'
import { 
    markLastVisitedPath, 
    getUserCookie, 
    changeTimeFormat, 
    changeAccuracyFormat ,
    grossWpm
} from '../../Utilities/functions'

const DEVELOPER_MODE = true
const TIMER_INTERVAL = 1000 //ms

const DrillModePage = () => {

    const [listOfWords, setListOfWords] = useState("")
    const [userInput, setUserInput] = useState("")
    const [indicator, setIndicator] = useState(false)
    const [timer, setTimer] = useState(0)

    const sampleRef = useRef()
    const sampleCounter = useRef(16)
    const currentLetter = useRef("")
    const anotherCounter = useRef(0)
    const interval = useRef()
    const userInputCopy = useRef("")
    const timerCopy = useRef(1)

    const isStarted = useRef(false)
    const typingAccuracy = useRef(0)
    const errorCount = useRef(0)
    const wordsPerMinute = useRef(0)

    let isFalseDetected = false

    const location = useLocation()

    useEffect(() => {
        const onPageLoad = () => {

            markLastVisitedPath(location.pathname)

            axios({
                method: "GET",
                url: `http://localhost:5000/api/words/drillMode/${getUserCookie().practice.selection}`
            })
            .then((res) => {
                currentLetter.current = res.data.words[0]
                setListOfWords(res.data.words)
            })
        }

        onPageLoad()
    }, [])

    useKey((ev, key) => {

        if(!isStarted.current){
            isStarted.current = true
            startTimer()
        }

        if(key === currentLetter.current){

            setIndicator(false)

            userInputCopy.current = userInputCopy.current + key
            //* Then the words are over
            if(userInputCopy.current.length === listOfWords.length){
                stopTimer()
                swal.fire({
                    icon: "success",
                    title: "Congratulations!",
                    text: "You have completed the stage",
                    confirmButtonColor: "#2285e4"
                })
                setUserInput((prev) => prev + key)
                return
            }

            anotherCounter.current += 1

            sampleRef.current.style.transform = `translateX(-${sampleCounter.current}px)`
            sampleCounter.current += 16

            currentLetter.current = listOfWords[anotherCounter.current]

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
        let currentNumOfLetters = userInputCopy.current.length
        typingAccuracy.current = errorCount.current === 0 ? 100 : 100 - ((errorCount.current / currentNumOfLetters) * 100).toFixed(1)

        //* Check for wpm
        wordsPerMinute.current = grossWpm(userInputCopy.current, timerCopy.current / 60)

        setTimer((prevTimer) => prevTimer + 1)
        timerCopy.current += 1
    }

    return (
        <div className="drill-mode-container">
            <div className="word-wrapper">
                <p ref={sampleRef} className="animated-text-container">
                    {listOfWords.split("").map((item, index) => {

                        if(userInput.charAt(index) === item && !isFalseDetected){
                            return <span className="word-true" key={index}>{item}</span>
                        }
                        else if(anotherCounter.current === index){
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
                <span>{(currentLetter.current !== "" && currentLetter.current !== undefined) && fingersMappingData[currentLetter.current.toLowerCase()].text}</span>
            </div>
            <div className="keyboard-wrapper">
                {Array.from(new Array(5)).map((item, indexOuter) => {
                    return(
                        <div key={indexOuter} className="keyboard-row utility-row">
                            {keysArrary[indexOuter].map((item, indexInner) => {
                                return(
                                    <span key={indexInner} className={`${fingersMappingData[item].keyClassName} ${item === currentLetter.current && `key-image-current ${fingersMappingData[item].highlighted}`}`}>{item}</span>
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
                    <p>Words Per Minute</p>
                    <span>{`${wordsPerMinute.current} wpm`}</span>
                </div>
                <div className="sub-utility">
                    <p>Accuracy</p>
                    <span>{changeAccuracyFormat(typingAccuracy.current)}</span>
                </div>
                <div className="sub-utility">
                    <p>Error Count</p>
                    <span>{errorCount.current}</span>
                </div>
            </div>
            {DEVELOPER_MODE && 
                <div className="developer-drill-tools">
                    {/* <button className="btn btn-primary" onClick={startTimer}>Start Timer</button> */}
                    <button className="btn btn-danger" onClick={stopTimer} disabled={!isStarted.current}>Stop Timer</button>
                </div>
            }
        </div>
    )
}

export default DrillModePage