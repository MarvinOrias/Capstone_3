import React from 'react';
import {Form, Card, Button} from 'react-bootstrap';

import ff7 from '../images/ff7.gif';

export default function SearchForm(props){
	return(
			<Card id="Card">
			  <img variant="top" src={ff7} className="image" alt={'1234'}/>
			  <span hidden={props.idHide}>id: {props.id} </span>
			  <Card.Body>

			    <Card.Text>Item name: {props.name}</Card.Text>
			    <Card.Text>
					      Description: {props.description}
			    </Card.Text>

			    <Card.Text>
					      Price: {props.price}
			    </Card.Text>

			    <Card.Text hidden={props.isActiveHide}>
					      On stock: {props.isActive}
			    </Card.Text>

			    <Card.Text hidden={props.quantityHide}>
			    	Quantity: <Form.Control type="number" onChange={props.quantity} min={1} max={100} className="products-quantity d-inline"/>	
			    </Card.Text>
			    
			    <Button variant="outline-info" onClick={props.add} className="me-3" hidden={props.addBtnHide}>Add to cart</Button>
			    <Button variant="outline-warning" onClick={props.edit} className="me-3" hidden={props.editBtnHide}>Edit Product</Button>
			    <Button variant="outline-success" onClick={props.active} hidden={props.activeBtnHide}>Active</Button>
			    <Button variant="outline-danger" onClick={props.archive}  className="mt-3" hidden={props.archiveBtnHide}>Archive</Button>

			  </Card.Body>
			</Card>
		)
}