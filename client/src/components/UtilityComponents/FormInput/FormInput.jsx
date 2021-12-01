import React from 'react'

import './FormInput_master.css'

const FormInput = ({...rest}) => {
    return (
        <input className={`${rest.customclass ? rest.customclass + " form-input-text" : "form-input-text"}`} {...rest}/>
    )
}

export default FormInput
