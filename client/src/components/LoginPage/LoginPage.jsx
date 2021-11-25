import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

import './LoginPage_master.css'

import AuthContext from '../context/AuthContext'

const LoginPage = () => {

    const [userInput, setUserInput] = useState({
        username: "",
        password: ""
    })

    const history = useHistory()
    const authorize = useContext(AuthContext)

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
            if(res.status === 200 && res.data.isLoggedIn === true){
                console.log("Successfully logged in")

                Cookies.set("authorToken", res.data.authToken)
                Cookies.set("refreshToken", res.data.refreshToken)

                authorize.setAuth(true)
                history.push("/")
            }
        })
        .catch((err) => {
            console.log(err)
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
