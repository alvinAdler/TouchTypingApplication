import React from 'react'
import Box from '@mui/material/Box'

const MaterialTabBody = ({children, currentTab, tabIndex}) => {
    return (
        <div role="tabpanel" className="material-tab-container" hidden={currentTab != tabIndex} style={{backgroundColor: "#eee"}}>
            {children}
        </div>
    )
}

export default MaterialTabBody
