import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaReact } from 'react-icons/fa'
import axios from 'axios'
import Cookies from 'js-cookie'

import './Navbar_master.css'

import AuthContext from '../../context/AuthContext'
import { logoutUser, capitalizeString } from '../../Utilities/functions'

const Navbar = () => {

	const authorize = useContext(AuthContext)
	const [userIdentity, setUserIdentity] = useState({
		username: "",
		_id: ""
	})

	useEffect(() => {
		const onPageLoad = () => {
			if(authorize.auth){
				axios({
					method: "GET",
					url: "http://localhost:5000/users/getUserIdentity",
					headers: {
						"Authorization": `Bearer ${Cookies.get("authorToken")}`
					}
				})
				.then((res) => {
					setUserIdentity(res.data.user)
				})
				.catch((err) => {
					console.log(err.response)
				})
			}
		}

		onPageLoad()
	}, [authorize.auth])

	const executeLogout = () => {
		logoutUser(authorize)
	}

    return (
		<div className="main-navbar" bg="light" expand="lg">
			<div className="main-nav-section">
				<Link to="/" className="plain-text"><FaReact className="main-icon"/></Link>
				<span id="nav-username">{capitalizeString(userIdentity.username)}</span>
			</div>
			<div className="main-nav-section">
				{authorize.auth ?
				<span className="plain-text" onClick={executeLogout}>Logout</span>
				:
				<Link to="/login" className="plain-text">Login</Link>
				}
				{!authorize.auth && <Link to="/register" className="plain-text">Register</Link>}
			</div>
		</div>
    )
}

export default Navbar
