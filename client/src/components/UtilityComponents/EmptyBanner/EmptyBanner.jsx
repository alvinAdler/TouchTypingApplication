import React from 'react'

import './EmptyBanner_master.css'

const EmptyBanner = ({title, description, suggestion, ...rest}) => {
    return (
        <div className={`${rest.customClass && rest.customClass} empty-banner-container`}>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{suggestion}</p>
        </div>
    )
}

export default EmptyBanner
