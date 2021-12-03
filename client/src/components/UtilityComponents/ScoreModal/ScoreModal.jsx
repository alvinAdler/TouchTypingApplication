import React from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

import './ScoreModal_master.css'

import BlackBanner from '../BlackBanner'

const ScoreModal = ({isModalActive, children, isSuccess=true}) => {
    return (
        <>
            <div className={`${!isModalActive && "hidden-modal"} score-modal-container`}>
                <img className="result-wave-top" src="/images/wave_scoreTop.svg" alt="Can not find picture" />
                <img className="result-wave-bottom" src="/images/wave_scoreBottom.svg" alt="Can not find picture" />
                <h2 className="performance-modal-title">Result</h2>
                {isSuccess ?
                <div className="performance-marker performance-success">
                    <span>Congratulations</span>
                    <FaCheck className="performance-icon-success"/>
                </div> 
                :
                <div className="performance-marker performance-fail">
                    <span>Better luck next time</span>
                    <FaTimes className="performance-icon-fail"/>
                </div>
                }
                <div className="content-section">
                    {children}
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptatum ipsam illum ut consequuntur at, neque repellat aperiam suscipit! Quod perferendis, minima tempore asperiores nisi voluptatum fuga quidem hic repellendus.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptatum ipsam illum ut consequuntur at, neque repellat aperiam suscipit! Quod perferendis, minima tempore asperiores nisi voluptatum fuga quidem hic repellendus.</p>
                </div>
                <div className="buttons-section">
                    <button className="score-button button-back">Back</button>
                    <button className="score-button button-repeat">Try Again</button>
                    <button className="score-button button-tomain">Main Menu</button>
                </div>
            </div>
            <BlackBanner isActive={isModalActive}/>
        </>
    )
}

export default ScoreModal
