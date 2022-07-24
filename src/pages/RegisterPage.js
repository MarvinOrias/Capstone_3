import React, {useState} from 'react';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

import Register from '../components/Register';

export default function RegisterPage(){
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [verifyPass, setVerifyPass] = useState('');

	const registerBtn = (e) => {
		e.preventDefault();
		
		if(email === '' || pass === '' || verifyPass === ''){
			Swal.fire({
				title: "Oops",
				icon: "warning",
				text: "All fields required"
			});
		}
		else if(pass !== verifyPass){
			Swal.fire({
				title: "Oops",
				icon: "warning",
				text: "Passwords did not match"
			});
		}
		else{
			fetch('https://code-eater-e-commerce.herokuapp.com/users/create', {
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body: JSON.stringify({
					email: email,
					password: pass
				})
			}).then((response) => {
				return response.json();
			}).then((register) => {
				if(register.message === 'This email is already registered'){
					Swal.fire({
						title: "Failed",
						icon: "error",
						text: `${register.message}`
					});
				}
				else{
					Swal.fire({
						title: "Success",
						icon: "success",
						text: `${register.message} for ${email}`
					});
					navigate('/');
				}
			}).catch((error) => {
				return error.message;
			})
		}
	}

	function emailShow(e){
		setEmail(e.target.value);
	}

	function passShow(e){
		setPass(e.target.value);
	}

	function verifyPassShow(e){
		setVerifyPass(e.target.value);
	}

	return(
			<>
				<Register register={registerBtn} email={emailShow} password={passShow} verifyPass={verifyPassShow}/>
			</>
		)
}