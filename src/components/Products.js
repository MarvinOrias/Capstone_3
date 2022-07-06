import React from 'react';
import {Card, Button} from 'react-bootstrap';

import ff7 from '../images/ff7.gif';

export default function Products(props){
	return(
			<Card id="Card">
			  <img variant="top" src={ff7} className="image" alt={'1234'}/>
			  <span>id: {props.id}</span>
			  <Card.Body>
			    <Card.Title>Item: {props.name}</Card.Title>
			    <Card.Text>
					      Description: {props.description}
			    </Card.Text>
			    <Card.Text>
					      Price: {props.price}
			    </Card.Text>
			    <Card.Text>
					      Availability: {props.isActive}
			    </Card.Text>
			    <Button variant="outline-warning">Add</Button>
			  </Card.Body>
			</Card>
		)
}