import React, {useState, useEffect, useRef} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'

import './DrillModePage_master.css'

import useKey from '../../Utilities/useKey'
import fingersMappingData from '../../Utilities/fingersMappingData'

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
                <div className="keyboard-row number-row">
                    <span className="key char">`</span>
                    <span className="key char">1</span>
                    <span className="key char">2</span>
                    <span className="key char">3</span>
                    <span className="key char">4</span>
                    <span className="key char">5</span>
                    <span className="key char">6</span>
                    <span className="key char">7</span>
                    <span className="key char">8</span>
                    <span className="key char">9</span>
                    <span className="key char">0</span>
                    <span className="key char">-</span>
                    <span className="key char">=</span>
                    <span className="key">Backspace</span>
                </div>
                <div className="keyboard-row top-row">
                    <span className="key">Tab</span>
                    <span className="key char">q</span>
                    <span className="key char">w</span>
                    <span className="key char">e</span>
                    <span className="key char">r</span>
                    <span className="key char">t</span>
                    <span className="key char">y</span>
                    <span className="key char">u</span>
                    <span className="key char">i</span>
                    <span className="key char">o</span>
                    <span className="key char">p</span>
                    <span className="key char">[</span>
                    <span className="key char">]</span>
                    <span className="key char">\</span>
                </div>
                <div className="keyboard-row home-row">
                    <span className="key">CAPS</span>
                    <span className="key char">a</span>
                    <span className="key char">s</span>
                    <span className="key char">d</span>
                    <span className="key char">f</span>
                    <span className="key char">g</span>
                    <span className="key char">h</span>
                    <span className="key char">i</span>
                    <span className="key char">j</span>
                    <span className="key char">k</span>
                    <span className="key char">l</span>
                    <span className="key char">;</span>
                    <span className="key char">'</span>
                    <span className="key">Ent</span>
                </div>
                <div className="keyboard-row bottom-row">
                    <span className="key">Shift</span>
                    <span className="key char">z</span>
                    <span className="key char">x</span>
                    <span className="key char">c</span>
                    <span className="key char">v</span>
                    <span className="key char">b</span>
                    <span className="key char">n</span>
                    <span className="key char">m</span>
                    <span className="key char">,</span>
                    <span className="key char">.</span>
                    <span className="key char">/</span>
                    <span className="key">Shift</span>
                </div>
                <div className="keyboard-row utility-row">
                    <span className="key">Ctrl</span>
                    <span className="key">Fn</span>
                    <span className="key">Win</span>
                    <span className="key">Alt</span>
                    <span className="key">SPACE</span>
                    <span className="key">Alt</span>
                    <span className="key">Fn</span>
                    <span className="key">Win</span>
                    <span className="key">Ctrl</span>
                </div>
            </div>
        </div>
    )
}

export default DrillModePage