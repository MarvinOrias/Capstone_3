import React, {useState, useEffect} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import fox from '../images/fox.png';
import avatar from '../images/avatar1.png';

function AppNav(){
	const navigate = useNavigate();

	const token = localStorage.getItem('token');
	const userlvl = localStorage.getItem(`admin`);
	const [user, setUser] = useState('');

	function welcomeUser(){
		fetch('https://code-eater-back-end.herokuapp.com/users/details', {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then((response) => {
			return response.json();
		}).then((data) => {
			setUser(data.details.email)
		}).catch((error) => {
			return error.message;
		})
	}

	function logoutLink(){
		localStorage.clear();
		Swal.fire({
			title: "Logged out",
			icon: "success",
			text: "Thank you. Be back again soon"
		});
		navigate('/')
	}

	useEffect(() => {
		welcomeUser();
	}, [token]);

	return(
			<>
				<Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="navbar">
					<Navbar.Brand as={Link} to="/" ><img src={fox} alt="fox-logo" className="fox" />
					</Navbar.Brand>
				    <Navbar.Toggle aria-controls="basic-navbar-nav" />
				    <Navbar.Collapse id="basic-navbar-nav">
				      <Nav className="ms-auto">
				        {
				        	token !== null && userlvl === `false`
				        	?
				        	<>
				        		<Nav.Link style={{color: "#F9AE51"}} as={Link} to="/">Home</Nav.Link>
				        		<Nav.Link as={Link} to="/products" style={{color: "#F9AE51"}}>Products</Nav.Link>
				        		<Nav.Link style={{color: "#F9AE51"}} as={Link} to="/cart">Cart</Nav.Link>
				        		<Nav.Link style={{color: "#F9AE51"}} as={Link} to="/orders">Orders</Nav.Link>
				        		<Nav.Link style={{color: "#F9AE51"}} onClick={logoutLink}>Log out</Nav.Link>
				        		<Nav.Link style={{color: "#F9AE51"}}><img src={avatar} alt="avatar" className="nav-avatar"/>: {user}</Nav.Link>
				        	</>
				        	:
				        	token !== null && userlvl === `true`
				        	?
				        	<>
				        		<>
				        			<Nav.Link style={{color: "#F9AE51"}} as={Link} to="/">Home</Nav.Link>
				        			<Nav.Link as={Link} to="/products" style={{color: "#F9AE51"}}>Products</Nav.Link>
				        			<Nav.Link style={{color: "#F9AE51"}} as={Link} to="/orders">Orders</Nav.Link>
				        			<Nav.Link style={{color: "#F9AE51"}} onClick={logoutLink}>Log out</Nav.Link>
				        			<Nav.Link style={{color: "#F9AE51"}}><img src={avatar} alt="avatar" className="nav-avatar"/>: {user}</Nav.Link>
				        		</>
				        	</>
				        	:
					        <>
					        	<Nav.Link href="#home" style={{color: "#F9AE51"}} as={Link} to="/">Home</Nav.Link>
					       		<Nav.Link as={Link} to="/products" style={{color: "#F9AE51"}}>Products</Nav.Link>
					       		<Nav.Link as={Link} to="/login" style={{color: "#F9AE51"}}>Log in</Nav.Link>
					       		<Nav.Link as={Link} to="/register" style={{color: "#F9AE51"}}>Register</Nav.Link>
					       		<Nav.Link style={{color: "#F9AE51"}}><img src={avatar} alt="avatar" className="nav-avatar"/>: Guest</Nav.Link>
					       	</>
				        }
				      </Nav>
				    </Navbar.Collapse>
				</Navbar>
			</>
		)
}

export default AppNav;