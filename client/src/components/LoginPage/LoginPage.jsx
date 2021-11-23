import React, { useState } from 'react'
import axios from 'axios'

import './LoginPage_master.css'

const LoginPage = () => {

    const [userInput, setUserInput] = useState({
        username: "",
        password: ""
    })

    const logUserIn = (ev) => {
        ev.preventDefault()

        axios({
            method: "POST",
            url: "http://localhost:5000/users/login",
            headers: {
                'content-type': 'application/json'
            },
            data: {
                username: userInput.username,
                password: userInput.password
            }
        })
        .then((res) => {
            console.log(res.data)
            if(res.status === 200 && res.data.isLoggedIn === true){
                console.log("Successfully logged in")
            }
        })
        .catch((err) => {
            console.log(err.response)
        })
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={logUserIn}>
                <h2 style={{textAlign: "center"}}>Login</h2>
                <hr className="my-4" />
                <input className="login-input" 
                type="text" 
                placeholder="Username"
                onChange = {(ev) => setUserInput({...userInput, username: ev.target.value})}
                />
                <input className="login-input" 
                type="password" 
                placeholder="Password"
                onChange = {(ev) => setUserInput({...userInput, password: ev.target.value})}
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default LoginPage
