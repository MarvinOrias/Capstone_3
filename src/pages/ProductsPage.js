import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import Swal from 'sweetalert2';

import ProductsForm from '../components/ProductsForm';

export default function ProductsPage(){
	const [items, setItems] = useState([]);
	const token = localStorage.getItem('token');
	
	const fetchData = () => {
		fetch('http://localhost:4000/products/all')
		.then((response) => {
			return response.json()
		}).then((products)=>{
			console.log(products)
			setItems(products.result)
		}).catch((error)=>{
			return(error.message);
		})
	}

	useEffect(() => {

		fetchData()
	}, [])

	const loadedData = items.map((products) => {
		if(products.isActive === true){
			return(
				<ProductsForm key={products._id} name={products.name} description={products.description} price={products.price} quantityShow={true} />
			)
		}
	})
	return(
			<>
				<Row>
					{loadedData}
				</Row>
			</>
		)
}