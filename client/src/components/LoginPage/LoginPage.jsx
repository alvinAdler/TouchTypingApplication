import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

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
            url: "http://localhost:5500/login",
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

                Cookies.set("authorToken", res.data.authToken)
                Cookies.set("refreshToken", res.data.refreshToken)
            }
        })
        .catch((err) => {
            console.log(err.response)
        })
    }

    const sampleRequest = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/users/getUsers",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${Cookies.get("authorToken")}`
            }
        })
        .then((res) => {
            console.log(res.data)
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
                <button type="button" className="btn btn-primary" onClick={sampleRequest}>Sample</button>
            </form>
        </div>
    )
}

export default LoginPage
