import React from 'react'
import { FaCheck, FaTimes, FaArrowLeft, FaRedo, FaHome } from 'react-icons/fa'

import './ScoreModal_master.css'

import BlackBanner from '../BlackBanner'

const ScoreModal = ({isModalActive, children, isSuccess=true}) => {
    return (
        <>
            <div className={`${isModalActive && "active-modal"} score-modal-container`}>
                <img className="result-wave-top" src="/images/wave_scoreTop.svg" alt="Can not find picture" />
                <img className="result-wave-bottom" src="/images/wave_scoreBottom.svg" alt="Can not find picture" />
                <h2 className="performance-modal-title">Result</h2>
                {isSuccess ?
                <div className="performance-marker performance-success">
                    <span>Congratulations!</span>
                    <FaCheck className="performance-icon-success"/>
                </div> 
                :
                <div className="performance-marker performance-fail">
                    <span>Better luck next time!</span>
                    <FaTimes className="performance-icon-fail"/>
                </div>
                }
                <div className="content-section">
                    {children}
                </div>
                <div className="buttons-section">
                    <button className="score-button button-back"><FaArrowLeft/></button>
                    <button className="score-button button-repeat" onClick={() => console.log("Repeated pressed")}><FaRedo/></button>
                    <button className="score-button button-tomain"><FaHome/></button>
                </div>
            </div>
            <BlackBanner isActive={isModalActive}/>
        </>
    )
}

export default ScoreModal
