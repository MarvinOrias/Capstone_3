import React from 'react';
import {Card, Button, Form} from 'react-bootstrap';

import ff7 from '../images/ff7.gif';

export default function ProductsForm(props){
	return(
			<Card id="Card">
			  <img variant="top" src={ff7} className="image" alt={'1234'}/>
			  <Card.Body>
			    <Card.Title>Item: {props.name}</Card.Title>
			    <Card.Text>
					      Description: {props.description}
			    </Card.Text>
			    <Card.Text>
					      Price: {props.price}
			    </Card.Text>
			        <Card.Text>
			    		      Quantity: <input type="number" className="products-quantity" value={props.quantity} hidden={props.quantityShow} />
			        </Card.Text>
			    <Button variant="outline-info" onClick={props.add} className="me-3">Add</Button>
			  </Card.Body>
			</Card>
		)
}