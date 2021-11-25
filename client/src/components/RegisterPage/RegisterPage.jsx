import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import './RegisterPage_master.css'

import { markLastVisitedPath } from '../Utilities/functions'

const RegisterPage = () => {

    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    const location = useLocation()

    useEffect(() => {
        markLastVisitedPath(location.pathname)
    }, [])

    const registerUser = (ev) => {
        ev.preventDefault()

        if(userInput.password !== userInput.confirmPassword){
            console.log("Password does not match. Please re-check")
            return
        }

        axios({
            method: "POST",
            url: "http://localhost:5500/register",
            headers: {
                "content-type": "application/json"
            },
            data: {
                username: userInput.username,
                password: userInput.password
            }
        })
        .then((res) => {
            if(res.status === 201 && res.data.isRegistered){
                console.log("User has been successfully registered")
            }
        })
        .catch((err) => {
            console.log(err.response)
        })
    }
    
    return (
        <div className="register-container">
            <form className="register-form" onSubmit={registerUser}>
                <h2 className="full-span" style={{textAlign: "center"}}>Register</h2>
                <hr className="my-4 full-span" />
                <input 
                className="login-input full-span" 
                type="text" 
                placeholder="Username"
                onChange={(ev) => setUserInput({...userInput, username: ev.target.value})}
                />
                <input 
                className="login-input" 
                type="password" 
                placeholder="Password"
                onChange={(ev) => setUserInput({...userInput, password: ev.target.value})}
                />
                <input 
                className="login-input" 
                type="password" 
                placeholder="Confirm Password"
                onChange={(ev) => setUserInput({...userInput, confirmPassword: ev.target.value})}
                />
                <button type="submit" className="btn btn-primary full-span">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage
