import React, {useState, useEffect, useRef} from 'react';
import {Row, Col} from 'react-bootstrap';
import Swal from 'sweetalert2';

import ProductsForm from '../components/ProductsForm';

export default function ProductsPage(){
	const [items, setItems] = useState([]);
	const userlvl = localStorage.getItem('admin');
	const token = localStorage.getItem('token');
	const [quantity, setQuantity] = useState(0);
	const shouldLog = useRef(true);
	
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
		if(shouldLog.current){
			shouldLog.current = false;
			fetchData();
		}
	}, [token])

	const quantityValue = (e) => {
		setQuantity(e.target.value);
	}

	function addItem(prodId, qty){
		fetch('http://localhost:4000/users/cart', {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				productId: prodId,
				quantity: qty

			})
		}).then((response) => {
				return response.json();
			}).then((addItem) => {
				Swal.fire({
					title: "Successfully added",
					icon: "success",
					text: `${addItem.message}`
				});
				fetchData();
			}).catch((error) => {
				return error.message;
			})
	}

	function addBtn(Id, quantity){
		if(token === null){
			Swal.fire({
				title: "Forgot to log in?",
				icon: "warning",
				text: `Log in to proceed with orders`
			})
		}
		else{
			if(quantity <= 0 || quantity === ''){
				Swal.fire({
					title: "Oops",
					icon: "warning",
					text: `Quantity of item is less than minimum`
				})
			}
			else if(quantity > 100 || quantity === ''){
				Swal.fire({
					title: "Oops",
					icon: "warning",
					text: `Quantity of item is above the required`
				})
			}
			else{
				addItem(Id, quantity);
				setQuantity(0);
			}
		}
	}

	const loadedData = items.map((products) => {
		if(token !== null && userlvl === 'true'){
			return(
				<ProductsForm key={products._id} name={products.name} description={products.description} isActive={`${products.isActive}`} price={products.price} quantityHide={true} addBtnHide={true} />
			)
		}
		else{
			if(products.isActive === true){
				return(
						<ProductsForm key={products._id} idHide={true} id={products._id} name={products.name} description={products.description} isActiveHide={true} price={products.price} add={() => {addBtn(products._id, quantity)}} quantity={quantityValue} editBtnHide={true} archiveBtnHide={true} />
					)
			}
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