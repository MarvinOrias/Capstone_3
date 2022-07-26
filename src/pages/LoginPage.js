import React, {useState} from 'react';
import{useNavigate, Navigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import LoginForm from '../components/LoginForm';

export default function LoginPage(){
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const navigate = useNavigate();

	function getEmail(e){
		setEmail(e.target.value);
	}

	const getPass = (e) => {
		setPass(e.target.value);
	};

	function loginBtn(e){
		e.preventDefault();
		if(email === '' || pass === ''){
			Swal.fire({
				title: "Oops",
				icon: "warning",
				text: "All fields required"
			})
		}
		else{
			fetch('https://code-eater-back-end.herokuapp.com/users/login', {
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body: JSON.stringify({
					email: email,
					password: pass
				})
			}).then((response) => {
				return response.json()
			}).then((login) => {
				if(login.message === 'Email or password incorrect'){
					Swal.fire({
						title: "Log in failed",
						icon: "error",
						text: "Incorrect email or password"
					})
				}
				else{
					localStorage.setItem('token', login.Token_Created);
					fetch('https://code-eater-back-end.herokuapp.com/users/details', {
						method: "GET",
						headers: {
							Authorization: `Bearer ${login.Token_Created}`
						}
					}).then((response) => {
						return response.json()
					}).then((login) => {
						localStorage.setItem('admin', login.details.isAdmin);
						if(login.details.isAdmin === true){
							Swal.fire({
								title: "Log in successful",
								icon: "success",
								text: `Admin logged in`
							})
							navigate('/');
						}
						else{
							Swal.fire({
								title: "Log in successful",
								icon: "success",
								text: "You are now logged in"
							})
							navigate('/');
						}
					}).catch((error) => {
						return error.message
					})
				}
			}).catch((error) => {
				return error.message
			})
		}
	}

	return(
			<>
				{localStorage.getItem('admin') === 'true' || localStorage.getItem('admin') === 'false'
				?
				<Navigate to="/products"/>
				:
				<>
					<LoginForm email={getEmail} password={getPass} btn={loginBtn}/>
				</>
				}
			</>
		)
}