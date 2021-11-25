import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar as NavbarReact, Container, Nav } from 'react-bootstrap'

import './Navbar_master.css'

import AuthContext from '../../context/AuthContext'
import { logoutUser } from '../../Utilities/functions'

const Navbar = () => {

	const authorize = useContext(AuthContext)

	const executeLogout = () => {
		logoutUser(authorize)
	}

    return (
		<NavbarReact className="main-navbar" bg="light" expand="lg">
			<Container>
				<div>
					<NavbarReact.Brand><Link to="/" className="plain-link">Main Menu</Link></NavbarReact.Brand>
					<NavbarReact.Brand>Name and Email</NavbarReact.Brand>
				</div>
				<Nav>
					{authorize.auth ?
					<span className="plain-link" onClick={executeLogout}>Logout</span>
					:
					<Link to="/login" className="plain-link">Login</Link>
					}
					<Link to="/register" className="plain-link">Register</Link>
				</Nav>
			</Container>
		</NavbarReact>
    )
}

export default Navbar
