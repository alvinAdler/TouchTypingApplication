import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert2'

import './RegisterPage_master.css'

import { markLastVisitedPath } from '../Utilities/functions'
import PageTitle from '../UtilityComponents/PageTitle/PageTitle'
import FormInput from '../UtilityComponents/FormInput/FormInput'
import FormButton from '../UtilityComponents/FormButton/FormButton'

const RegisterPage = () => {

    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        markLastVisitedPath(location.pathname)
    }, [])

    const registerUser = (ev) => {
        ev.preventDefault()

        if(userInput.username === "" || userInput.password === "" || userInput.confirmPassword === ""){
            swal.fire({
                icon: "error",
                title: "Fields Empty",
                text: "Please fill in all fields before register!",
                confirmButtonColor: "#eb4034"
            })
            return
        }

        if(userInput.password !== userInput.confirmPassword){
            swal.fire({
                icon: "error",
                title: "Password mismatch",
                text: "Please retype the password correctly",
                confirmButtonColor: "#eb4034"
            })
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
                swal.fire({
                    icon: "success",
                    title: "User has been successfully registered!",
                    text: "You will be directed to the login menu",
                    confirmButtonColor: "#2285e4"
                })
                .then(() => {
                    history.push("/login")
                })
            }
        })
        .catch((err) => {
            if(err.response && err.response.status === 400){
                swal.fire({
                    icon: "error",
                    title: "Username already exist",
                    text: "Please choose another username",
                    confirmButtonColor: "#eb4034"
                })
            }
            console.log(err.response)
        })
    }
    
    return (
        <div className="register-container">
            <PageTitle titleName="Register"/>
            <form className="register-form" onSubmit={registerUser}>
                <FormInput
                customclass="full-span"
                type="text" 
                placeholder="Username"
                onChange={(ev) => setUserInput({...userInput, username: ev.target.value})}
                />
                <FormInput 
                type="password" 
                placeholder="Password"
                onChange={(ev) => setUserInput({...userInput, password: ev.target.value})}
                />
                <FormInput 
                type="password" 
                placeholder="Confirm Password"
                onChange={(ev) => setUserInput({...userInput, confirmPassword: ev.target.value})}
                />
                <FormButton customclass="full-span" buttonText="Register" type="submit"/>
            </form>
        </div>
    )
}

export default RegisterPage
