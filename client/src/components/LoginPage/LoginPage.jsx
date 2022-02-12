import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import swal from 'sweetalert2'

import './LoginPage_master.css'

import AuthContext from '../context/AuthContext'
import PageTitle from '../UtilityComponents/PageTitle/PageTitle'
import FormInput from '../UtilityComponents/FormInput/FormInput'
import FormButton from '../UtilityComponents/FormButton/FormButton'
import { modifyUserCookie } from '../Utilities/functions'

const LoginPage = () => {

    const [userInput, setUserInput] = useState({
        username: "",
        password: ""
    })

    const history = useHistory()
    const authorize = useContext(AuthContext)

    const logUserIn = (ev) => {
        ev.preventDefault()

        if(userInput.username === "" || userInput.password === ""){
            swal.fire({
                icon: "error",
                title: "Error!",
                text: "Fields empty. Please fill in all fields before logging in!",
                confirmButtonColor: "#eb4034"
            })
            return
        }

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
                modifyUserCookie("gameMode", "easy")
			    modifyUserCookie("drillMode", "homeRow")

                swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Log in success. You will be redirected to the main menu",
                    confirmButtonColor: "#2285e4"
                })
                .then(() => {
                    authorize.setAuth(true)
                    history.push("/")
                })
            }
        })
        .catch((err) => {
            if(err.response){
                if(!err.response.data.isLoggedIn){
                    swal.fire({
                        icon: "error",
                        title: "Wrong username or password!",
                        text: "Please recheck your username and password",
                        confirmButtonColor: "#eb4034"
                    })
                }
            }
            console.log(err)
        })
    }

    return (
        <div className="login-container">
            <PageTitle titleName="Login"/>
            <form className="login-form" onSubmit={logUserIn}>
                <FormInput
                customclass="w-50"
                type="text" 
                placeholder="Username"
                onChange = {(ev) => setUserInput({...userInput, username: ev.target.value})}
                />
                <FormInput
                customclass="w-50"
                type="password" 
                placeholder="Password"
                onChange = {(ev) => setUserInput({...userInput, password: ev.target.value})}
                />
                <FormButton buttonText="Login" type="submit"/>
            </form>
        </div>
    )
}

export default LoginPage
