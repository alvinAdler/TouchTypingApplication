import React from 'react'

import './MaterialTabBody_master.css'

const MaterialTabBody = ({children, currentTab, tabIndex}) => {
    return (
        <div role="tabpanel" className="material-tab-container" hidden={currentTab != tabIndex}>
            {children}
        </div>
    )
}

export default MaterialTabBody
