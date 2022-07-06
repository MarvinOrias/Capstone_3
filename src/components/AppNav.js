import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import fox from '../images/fox.png';

function AppNav(){
	return(
			<>
				<Navbar bg="dark" variant="dark" expand="lg" sticky="top">
					<Navbar.Brand as={Link} to="/" ><img src={fox} alt="fox-logo" className="fox" />
					</Navbar.Brand>
				    <Navbar.Brand as={Link} to="/" style={{color: "#F9AE51", fontSize: "25px"}} className="brand">Marv'S</Navbar.Brand>
				    <Navbar.Toggle aria-controls="basic-navbar-nav" />
				    <Navbar.Collapse id="basic-navbar-nav">
				      <Nav className="ms-auto">
				        <Nav.Link href="#home" style={{color: "#F9AE51"}} as={Link} to="/">Home</Nav.Link>
				        <Nav.Link as={Link} to="/" style={{color: "#F9AE51"}}>Products</Nav.Link>
				        <Nav.Link as={Link} to="/login" style={{color: "#F9AE51"}}>Log in</Nav.Link>
				        <Nav.Link as={Link} to="/register" style={{color: "#F9AE51"}}>Register</Nav.Link>
				        <Nav.Link as={Link} to="/logout" style={{color: "#F9AE51"}}>Log out</Nav.Link>
				      </Nav>
				    </Navbar.Collapse>
				</Navbar>
			</>
		)
}

export default AppNav;