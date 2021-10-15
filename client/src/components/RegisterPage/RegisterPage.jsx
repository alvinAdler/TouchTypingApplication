import React, {useState} from 'react'

import './RegisterPage_master.css'

const RegisterPage = () => {
    
    return (
        <div className="register-container">
            <form className="register-form">
                <h2 className="full-span" style={{textAlign: "center"}}>Register</h2>
                <hr className="my-4 full-span" />
                <input className="login-input" type="text" placeholder="Firstname"/>
                <input className="login-input" type="text" placeholder="Lastname"/>
                <input className="login-input full-span" type="text" placeholder="Username"/>
                <input className="login-input" type="text" placeholder="Password"/>
                <input className="login-input" type="text" placeholder="Confirm Password"/>
                <button className="btn btn-primary full-span">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage
