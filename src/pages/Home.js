import React, {useState} from 'react';
import {Row, Col} from 'react-bootstrap';

import Products from '../components/Products';

export default function Home(){
	const [items, setItems] = useState([]);
	
	fetch('http://localhost:4000/products/all').then(response=>response.json()).then((products)=>{
		setItems(products.result)
	}).catch((error)=>{
		return(error.message);
	})

	const loadedData = items.map((products) => {
		return(
				<Products key={products._id} id={products._id} name={products.name} description={products.description} price={products.price} isActive={`${products.isActive}`} />
			)
	})

	return(
			<>
				<Row>
					{loadedData}
				</Row>
			</>
		)
}