import React from 'react'

import './GameModePage_master.css'

import PlaceholderJumbotron from '../../UtilityComponents/PlaceholderJumbotron/PlaceholderJumbotron'

const GameModePage = () => {
    return (
        <div className="game-mode-container">
            <div className="gameplay-canvas">
                <span>Main Canvas for Gameplay</span>
            </div>
            <input className="gameplay-input" type="text" placeholder="Inputs from User" />
        </div>
    )
}

export default GameModePage
