import React from 'react';
import {Button, Row, Col, Card} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import fox from "../images/fox.png";

export default function Home(){
	
	const navigate = useNavigate();

	function browseBtn(){
		navigate('/products')
	}

	return(
			<>
				<div className="home">
					<Row>

						<Col sm={12} md={12}>
							<img src={fox} alt="fox" className="mb-2 mt-3 ms-3"/>
						</Col>

						<Col sm={12} md={12}>
							<h2 className="ms-3 mt-2">Collectibles for everyone, anywhere</h2>
						</Col>

						<Col sm={12} md={12}>
							<Button className="ms-3" variant="info" size="sm" onClick={browseBtn}>Browse collections</Button>
						</Col>

						<Col sm={12} md={4}>
							<Card className="home-card" style={{backgroundColor: '#3C382D', height: '19.5rem', border: '5px solid white'}}>
							  <Card.Body>
							    <Card.Title style={{fontSize: "30px"}}>Easy</Card.Title>
							    <Card.Text style={{fontSizeAdjust: '20px'}}>
							      We value everyone and build trust around. Everything you browse here is authentic. No need of second thoughts of non-authentic collections.
							    </Card.Text>
							  </Card.Body>
							</Card>
						</Col>

						<Col sm={12} md={4}>
							<Card className="home-card" style={{backgroundColor: '#3C382D', height: '19.5rem', border: '5px solid white'}}>
							  <Card.Body>
							    <Card.Title style={{fontSize: "30px"}}>Fast</Card.Title>
							    <Card.Text style={{fontSizeAdjust: '20px'}}>
							      Planning to find rare collections? Planning to get one the soonest? No need to worry about it! You will receive your items right away!
							    </Card.Text>
							  </Card.Body>
							</Card>
						</Col>

						<Col sm={12} md={4}>
							<Card className="home-card" style={{backgroundColor: '#3C382D', height: '19.5rem', border: '5px solid white'}}>
							  <Card.Body>
							    <Card.Title style={{fontSize: "30px"}}>Growing Community</Card.Title>
							    <Card.Text style={{fontSizeAdjust: '100px'}}>
							    	Let's grow and connect together. Discuss and converse to anyone here: foxdiscussions.com
							    </Card.Text>
							  </Card.Body>
							</Card>
						</Col>

					</Row>
				</div>
			</>
		)
}