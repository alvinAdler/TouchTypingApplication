import React from 'react'

import './PageTitle_master.css'

const PageTitle = ({titleName}) => {
    return (
        <h1 className="page-title">
            {titleName}
        </h1>
    )
}

export default PageTitle
