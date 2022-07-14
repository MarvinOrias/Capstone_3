import React from 'react';
import {Card, Button} from 'react-bootstrap';

import ff7 from '../images/ff7.gif';

export default function AdminForm(props){
	return(
			<Card id="Card">
			  <img variant="top" src={ff7} className="image" alt={'1234'}/>
			  <span hidden={props.idHide}>id: {props.id}</span>
			  <Card.Body>
			    <Card.Title>Item: {props.name}</Card.Title>
			    <Card.Text>
					      Description: {props.description}
			    </Card.Text>
			    <Card.Text>
					      Price: {props.price}
			    </Card.Text>
			    <Card.Text hidden={props.isActiveHide}>
					      Availability: {props.isActive}
			    </Card.Text>
			    <Button variant="outline-info" onClick={props.add} className="me-3" hidden={props.addBtnHide}>Add</Button>
			    <Button variant="outline-warning" onClick={props.edit} className="me-3" hidden={props.editBtnHide}>Edit Product</Button>
			    <Button variant="outline-danger" onClick={props.archive} hidden={props.archiveBtnHide}>Archive</Button>
			  </Card.Body>
			</Card>
		)
}