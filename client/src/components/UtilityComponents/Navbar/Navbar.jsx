import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar as NavbarReact, Container, Nav} from 'react-bootstrap'

import './Navbar_master.css'

const Navbar = () => {
    return (
		<NavbarReact className="main-navbar" bg="light" expand="lg">
			<Container>
				<div>
					<NavbarReact.Brand><Link to="/" className="plain-link">Main Menu</Link></NavbarReact.Brand>
					<NavbarReact.Brand>Name and Email</NavbarReact.Brand>
				</div>
				<Nav>
					<Link to="/login" className="plain-link">Login</Link>
					<Link to="/register" className="plain-link">Register</Link>
				</Nav>
			</Container>
		</NavbarReact>
    )
}

export default Navbar
