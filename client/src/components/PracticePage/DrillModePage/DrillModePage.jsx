import React, {useState, useEffect, useRef} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'

import './DrillModePage_master.css'

import useKey from '../../Utilities/useKey'
import fingersMappingData from '../../Utilities/fingersMappingData'
import keysArrary from '../../Utilities/keysArray'

const DrillModePage = () => {

    const [listOfWords, setListOfWords] = useState("")
    const [userInput, setUserInput] = useState("")
    const [indicator, setIndicator] = useState(false)

    const sampleRef = useRef()
    const sampleCounter = useRef(16)
    const currentLetter = useRef("")
    const anotherCounter = useRef(0)

    let isFalseDetected = false

    const location = useLocation()

    useEffect(() => {
        const onPageLoad = () => {
            axios({
                method: "GET",
                url: `http://localhost:5000/api/words/drillMode/${location.state.diff}`
            })
            .then((res) => {
                currentLetter.current = res.data.words[0]
                setListOfWords(res.data.words)
            })
        }

        onPageLoad()
    }, [])

    useKey((ev, key) => {
        if(key === currentLetter.current){
            setIndicator(false)
            anotherCounter.current += 1
            
            sampleRef.current.style.transform = `translateX(-${sampleCounter.current}px)`
            sampleCounter.current += 16
            
            currentLetter.current = listOfWords[anotherCounter.current]
            setUserInput((prev) => prev + key)
        }
        else{
            setIndicator(true)
        }
    })

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
                                    <span key={indexInner} className={`${fingersMappingData[item].keyClassName} ${item === currentLetter.current && "key-image-current"}`}>{item}</span>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DrillModePage