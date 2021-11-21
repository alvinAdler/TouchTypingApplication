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
                    <span className="key size-sm">`</span>
                    <span className="key size-sm">1</span>
                    <span className="key size-sm">2</span>
                    <span className="key size-sm">3</span>
                    <span className="key size-sm">4</span>
                    <span className="key size-sm">5</span>
                    <span className="key size-sm">6</span>
                    <span className="key size-sm">7</span>
                    <span className="key size-sm">8</span>
                    <span className="key size-sm">9</span>
                    <span className="key size-sm">0</span>
                    <span className="key size-sm">-</span>
                    <span className="key size-sm">=</span>
                    <span className="key">Backspace</span>
                </div>
                <div className="keyboard-row top-row">
                    <span className="key size-md">Tab</span>
                    <span className="key size-sm">q</span>
                    <span className="key size-sm">w</span>
                    <span className="key size-sm">e</span>
                    <span className="key size-sm">r</span>
                    <span className="key size-sm">t</span>
                    <span className="key size-sm">y</span>
                    <span className="key size-sm">u</span>
                    <span className="key size-sm">i</span>
                    <span className="key size-sm">o</span>
                    <span className="key size-sm">p</span>
                    <span className="key size-sm">[</span>
                    <span className="key size-sm">]</span>
                    <span className="key size-sm">\</span>
                </div>
                <div className="keyboard-row home-row">
                    <span className="key size-lg">CAPS</span>
                    <span className="key size-sm">a</span>
                    <span className="key size-sm">s</span>
                    <span className="key size-sm">d</span>
                    <span className="key size-sm">f</span>
                    <span className="key size-sm">g</span>
                    <span className="key size-sm">h</span>
                    <span className="key size-sm">j</span>
                    <span className="key size-sm">k</span>
                    <span className="key size-sm">l</span>
                    <span className="key size-sm">;</span>
                    <span className="key size-sm">'</span>
                    <span className="key size-lg">Ent</span>
                </div>
                <div className="keyboard-row bottom-row">
                    <span className="key size-exlg">Shift</span>
                    <span className="key size-sm">z</span>
                    <span className="key size-sm">x</span>
                    <span className="key size-sm">c</span>
                    <span className="key size-sm">v</span>
                    <span className="key size-sm">b</span>
                    <span className="key size-sm">n</span>
                    <span className="key size-sm">m</span>
                    <span className="key size-sm">,</span>
                    <span className="key size-sm">.</span>
                    <span className="key size-sm">/</span>
                    <span className="key size-exlg">Shift</span>
                </div>
                <div className="keyboard-row utility-row">
                    <span className="key size-util">Ctrl</span>
                    <span className="key size-util">Fn</span>
                    <span className="key size-util">Win</span>
                    <span className="key size-util">Alt</span>
                    <span className="key" style={{flexGrow: 5}}>SPACE</span>
                    <span className="key size-util">Alt</span>
                    <span className="key size-util">Fn</span>
                    <span className="key size-util">Win</span>
                    <span className="key size-util">Ctrl</span>
                </div>
            </div>
        </div>
    )
}

export default DrillModePage