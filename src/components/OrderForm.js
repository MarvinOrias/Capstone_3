import React from 'react';
import {Form, Card, Button, Col} from 'react-bootstrap';

import ff7 from '../images/ff7.gif';

export default function OrderForm(props){
	return(
			<>
				<Card id="Card">
					  		<img variant="top" src={ff7} className="image" alt={'1234'}/>
						  	<Card.Body>

						  	<Card.Text hidden={props.orderIdHide}>Order No: {props.orderId}</Card.Text>

						    <Card.Text>Product details: {props.details}</Card.Text>
						    <Card.Text>
								      Amount: {props.amount}
						    </Card.Text>

						     <Card.Text>
								      Ordered on: {props.date}
						    </Card.Text>

						    <Card.Text>
								      Status: {props.status}
						    </Card.Text>
						    
						    <Button variant="outline-danger" onClick={props.cancel} className="mb-2">Cancel order</Button>

						    {/*<Card.Text hidden={props.isEmpty}>
								      Cart is empty
						    </Card.Text>*/}

						  	</Card.Body>
						</Card>	
			</>
		)
}