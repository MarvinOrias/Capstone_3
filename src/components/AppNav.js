import React, {useState, useEffect} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link, navigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import fox from '../images/fox.png';

function AppNav(){
	const token = localStorage.getItem('Token');
	console.warn(token)

	function logoutLink(){
		localStorage.clear();
		Swal.fire({
			title: "Logged out",
			icon: "success",
			text: "Thank you. Be back again soon"
		})
	}

	return(
			<>
				<Navbar bg="dark" variant="dark" expand="lg" sticky="top">
					<Navbar.Brand as={Link} to="/" ><img src={fox} alt="fox-logo" className="fox" />
					</Navbar.Brand>
				    <Navbar.Brand as={Link} to="/" style={{color: "#F9AE51", fontSize: "25px"}} className="brand">Marv'S</Navbar.Brand>
				    <Navbar.Toggle aria-controls="basic-navbar-nav" />
				    <Navbar.Collapse id="basic-navbar-nav">
				      <Nav className="ms-auto">
				        {
				        	token !== null
				        	?
				        	<>
				        		<Nav.Link href="#home" style={{color: "#F9AE51"}} as={Link} to="/">Home</Nav.Link>
				        		<Nav.Link as={Link} to="/" style={{color: "#F9AE51"}}>Products</Nav.Link>
				        		<Nav.Link style={{color: "#F9AE51"}} onClick={logoutLink}>Log out</Nav.Link>
				        	</>
				        	:
				        	<>
				        		<Nav.Link href="#home" style={{color: "#F9AE51"}} as={Link} to="/">Home</Nav.Link>
				        		<Nav.Link as={Link} to="/" style={{color: "#F9AE51"}}>Products</Nav.Link>
				        		<Nav.Link as={Link} to="/login" style={{color: "#F9AE51"}}>Log in</Nav.Link>
				        		<Nav.Link as={Link} to="/register" style={{color: "#F9AE51"}}>Register</Nav.Link>
				        	</>
				        }
				      </Nav>
				    </Navbar.Collapse>
				</Navbar>
			</>
		)
}

export default AppNav;