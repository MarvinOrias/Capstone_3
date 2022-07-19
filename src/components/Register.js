import React, {useState} from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';

export default function Register(props){
	const [show, setShow] = useState(false);
	const [showVerify, setShowVerify] = useState(false);

	const showPass = () => {
		setShow(!show);
	}

	function showVerified(){
		setShowVerify(!showVerify);
	}

	return(
			<>
				<div className="register-form">
					<h2>Register</h2>
					<Form className="m-2" onSubmit={props.register}>
						<Row>
							<Col sm={12} md={12}>
								    <Form.Group className="mb-3" controlId="formBasicEmail">
								        <Form.Label>Email address</Form.Label>
								        <Form.Control type="email" placeholder="Enter email" onChange={props.email} />
								    </Form.Group>
							</Col>
						
							<Col sm={12} md={6}>
								<Form.Group className="mb-3" controlId="formBasicPassword">
								    <Form.Label>Password</Form.Label>
								    <Form.Control type={show ? "text" : "password"} placeholder="Password" onChange={props.password} />
								</Form.Group>
								
								<Form.Group className="mb-3" controlId="formBasicCheckbox">
								    <Form.Check type="checkbox" label="Show password" onClick={showPass} />
								</Form.Group>
							</Col>

							<Col sm={12} md={6}>
								<Form.Group className="mb-3" controlId="formBasicVerifyPassword">
								    <Form.Label>Verify Password</Form.Label>
								    <Form.Control type={showVerify ? "text" : "password"} placeholder="Password" onChange={props.verifyPass} />
								</Form.Group>
								
								<Form.Group className="mb-3" controlId="formBasicCheckbox">
								    <Form.Check type="checkbox" label="Show password" onClick={showVerified} />
								</Form.Group>
							</Col>
				
							<Col>
								<Button variant="info" type="submit">
								    Register
								</Button>
							</Col>	
						</Row>

					</Form>
				</div>
			</>
		)
}