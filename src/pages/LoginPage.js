import React, {useState} from 'react';
import{useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import LoginForm from '../components/LoginForm';

export default function LoginPage(){
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [credentials, setCredentials] = useState([]);
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
			fetch('http://localhost:4000/users/login', {
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body: JSON.stringify({
					email: email,
					password: pass
				})
			}).then((response) => {
				return(response.json())
			}).then((data) => {
				if(data.message === "Email or password incorrect"){
					Swal.fire({
						title: "Incorrect",
						icon: "error",
						text: "Email or password incorrect"
					})
				}
				else{
					const newCredential = credentials;
					newCredential.push({info: data});
					Swal.fire({
						title: "Logged in",
						icon: "success",
						text: `Welcome user ${email}`
					})
					const newMap = credentials.map((data) => {
						return(
								data.info.Token_Created
							)
					})
					localStorage.setItem('Token', newMap);
					navigate('/')
				}
			}).catch((error) => {
				return(error.message)
			})
		}
	}

	return(
			<>
				<LoginForm email={getEmail} password={getPass} btn={loginBtn}/>
			</>
		)
}