import React from 'react'
import {Navbar as NavbarReact, Container, Nav, Row} from 'react-bootstrap'

import './Navbar_master.css'

const Navbar = () => {
    return (
		<NavbarReact style={{backgroundColor: "#eee"}}>
			<Container className="navbar-container">
				<NavbarReact.Brand>Lorem Ipsum</NavbarReact.Brand>
				<Nav>
					<Nav.Link >Login</Nav.Link>
					<Nav.Link>Register</Nav.Link>
				</Nav>
			</Container>
		</NavbarReact>
    )
}

export default Navbar
