import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar as NavbarReact, Container, Nav } from 'react-bootstrap'
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
					console.log(res)
					console.log(res.data)
					console.log(res.data.user)
					console.log(res.data.user.username)
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
		<NavbarReact className="main-navbar" bg="light" expand="lg">
			<Container>
				<div>
					<NavbarReact.Brand><Link to="/" className="plain-link">Main Menu</Link></NavbarReact.Brand>
					<NavbarReact.Brand>{capitalizeString(userIdentity.username)}</NavbarReact.Brand>
				</div>
				<Nav>
					{authorize.auth ?
					<span className="plain-link" onClick={executeLogout}>Logout</span>
					:
					<Link to="/login" className="plain-link">Login</Link>
					}
					{!authorize.auth && <Link to="/register" className="plain-link">Register</Link>}
				</Nav>
			</Container>
		</NavbarReact>
    )
}

export default Navbar
