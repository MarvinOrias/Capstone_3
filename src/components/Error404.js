import React from 'react';
import {Carousel} from 'react-bootstrap';

import image404 from '../images/404.png';

export default function Error404(){
	return(
			<>
				<div className="error_div mt-2">
					<a href="/" className="error_link">Go home</a>
				</div>
				<Carousel className="my-2">
				  <Carousel.Item>
				    <img src={image404}
				      className="d-block w-100"
				      alt="page not found"
				    />
				    <Carousel.Caption>
				      <h3 className="caption">404</h3>
				      <p className="caption">Page not found</p>
				    </Carousel.Caption>
				  </Carousel.Item>
				</Carousel>
			</>
		)
}