import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar as NavbarReact, Container, Nav } from 'react-bootstrap'

import './Navbar_master.css'

import AuthContext from '../../context/AuthContext'

const Navbar = () => {

	const authorize = useContext(AuthContext)

    return (
		<NavbarReact className="main-navbar" bg="light" expand="lg">
			<Container>
				<div>
					<NavbarReact.Brand><Link to="/" className="plain-link">Main Menu</Link></NavbarReact.Brand>
					<NavbarReact.Brand>Name and Email</NavbarReact.Brand>
				</div>
				<Nav>
					{authorize.auth ?
					<Link to="/login" className="plain-link">Logout</Link>
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
