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

						    <Card.Text hidden={props.detailsHide}>Product details: [{props.details}]</Card.Text>
						    <Card.Text hidden={props.priceHide}>
								      Amount: {props.price}
						    </Card.Text>

						     <Card.Text hidden={props.dateHide}>
								      Ordered on: {props.date}
						    </Card.Text>

						    <Card.Text hidden={props.statusHide}>
								      Status: {props.status}
						    </Card.Text>
						    
						    <Button variant="outline-danger" hidden={props.cancelBtnHide} onClick={props.cancelBtn} className="me-3 mb-3">Cancel</Button>
						    <Button variant="outline-warning" hidden={props.pendingBtnHide} onClick={props.pendingBtn} className="me-3 mb-3">Pending</Button>
						    <Button variant="outline-success" hidden={props.successBtnHide} onClick={props.successBtn} className="me-3 mb-2\1">Delivered</Button>

						    {/*<Card.Text hidden={props.isEmpty}>
								      Cart is empty
						    </Card.Text>*/}

						  	</Card.Body>
						</Card>	
			</>
		)
}