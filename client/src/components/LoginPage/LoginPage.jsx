import React from 'react'

import './LoginPage_master.css'

const LoginPage = () => {

    return (
        <div className="login-container">
            <form className="login-form">
                <h2 style={{textAlign: "center"}}>Login</h2>
                <hr className="my-4" />
                <input className="login-input" type="text" placeholder="Username"/>
                <input className="login-input" type="text" placeholder="Password"/>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage
