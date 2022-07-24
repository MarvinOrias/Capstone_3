import React from 'react';
import {Card, Button} from 'react-bootstrap';

import ff7 from '../images/ff7.gif';

export default function CartForm(props){
	return(
			<>
				<Card id="Card">
					  		<img variant="top" src={ff7} className="image" alt={'1234'}/>
						  	<span hidden={props.idHide}>id: {props.cartId} </span>
						  	<Card.Body>

						  	<Card.Text>Order No: {props.orderNo}</Card.Text>

						    <Card.Text>Product name: {props.name}</Card.Text>
						    <Card.Text>
								      Quantity: {props.quantity}
						    </Card.Text>

						    <Card.Text>
								      Price: {props.total}
						    </Card.Text>
						    
						    <Button variant="outline-danger" onClick={props.remove} hidden={props.removeBtnHide} className="mb-2">Remove item</Button>

						  	</Card.Body>
						</Card>	
			</>
		)
}