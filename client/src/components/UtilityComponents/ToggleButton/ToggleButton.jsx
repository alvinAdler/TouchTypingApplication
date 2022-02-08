import { useState } from 'react';
import { FaClock } from 'react-icons/fa'

import './ToggleButton_master.css'

const ToggleButton = ({
    optionalIcon, 
    customClass,
    toggleState,
    setToggleState,
    ...rest
}) => {

    return(
        <button {...rest} className={`${customClass} ${toggleState && "toggle-button-active"} toggle-button-container`} onClick={() => setToggleState(!toggleState)}>
            <FaClock className={`${toggleState && "toggle-button-active"}`}/>
        </button>
    )
};

export default ToggleButton;
