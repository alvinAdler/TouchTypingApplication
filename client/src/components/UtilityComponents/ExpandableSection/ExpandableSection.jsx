import React, { useState } from 'react'
import { FaQuestion } from 'react-icons/fa'

import './ExpandableSection_master.css'

const ExpandableSection = ({sectionTitle="Sample Title", initialStatus=false, children}) => {

    const [isOpen, setIsOpen] = useState(initialStatus)

    return (
        <div className="expandable-section-container">
            <div className={`${isOpen && "theme-active"} ex-header-section`} onClick={() => setIsOpen(!isOpen)}>
                <FaQuestion/>
                <h3 className="ex-section-title">{sectionTitle}</h3>
            </div>
            <div className={`${isOpen && "active-content"} ex-content-section`}>
                {children}
            </div>
        </div>
    )
}

export default ExpandableSection
