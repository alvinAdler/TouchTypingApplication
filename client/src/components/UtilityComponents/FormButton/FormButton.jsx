import React from 'react'

import './FormButton_master.css'

const FormButton = ({buttonText, ...rest}) => {
    return (
        <button className={`${rest.customclass ? rest.customclass + " button-form" : "button-form"}`} {...rest}>
            {buttonText}
        </button>
    )
}

export default FormButton
