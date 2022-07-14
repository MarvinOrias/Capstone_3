import React from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';

export default function LoginForm(props){
	return(
			<>
				<div className="login-form">
					<h2>Log in</h2>
					<Form className="m-2" onSubmit={props.btn}>
					  <Row>
					  	<Col sm={12} md={6}>
					  		<Form.Group className="mb-3" controlId="formBasicEmail">
					  		  <Form.Label>Email address</Form.Label>
					  		  <Form.Control type="email" placeholder="Enter email" onChange={props.email}/>
					  		</Form.Group>
					  	</Col>

					  	<Col sm={12} md={6}>
					  		<Form.Group className="mb-3" controlId="formBasicPassword">
					  		  <Form.Label>Password</Form.Label>
					  		  <Form.Control type="password" placeholder="Password" onChange={props.password}/>
					  		  <i class="far fa-eye" id="togglePassword"></i>
					  		</Form.Group>
					  	</Col>
					  	<Col>
					  		<div className="login_btn">
					  			<Button variant="warning" type="submit">
					  			  Log in
					  			</Button>
					  		</div>
					  	</Col>
					  </Row>
					</Form>
				</div>
			</>
		)
}