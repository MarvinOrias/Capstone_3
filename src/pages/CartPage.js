import React, {useState, useEffect, useRef} from 'react';
import {Row, Button} from 'react-bootstrap';
import Swal from 'sweetalert2';
import {useNavigate, Navigate} from 'react-router-dom';

import CartForm from '../components/CartForm';
import EmptyForm from '../components/EmptyForm';
import Page404 from './Page404';

export default function CartPage(){
	const userlvl = localStorage.getItem('admin');
	const token = localStorage.getItem('token');

	const [cartInfo, setCartInfo] = useState([]);
	const [emptyCart, setEmptyCart] = useState(false);
	const [cartTotal, setCartTotal] = useState(0);

	const shouldLog = useRef(true);
	const navigate = useNavigate();

	function cartDetails(isShow){
		fetch('https://git.heroku.com/code-eater-e-commerce.git', {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then((response) => {
				return response.json();
			}).then((cartDetails) => {
				if(token === null){
					<Navigate to="*" />
				}
				else if(cartDetails.message === `User cart is empty`){
					if(isShow){
						setEmptyCart(true);
						Swal.fire({
								title: "Empty",
								icon: "warning",
								text: "Your cart is empty"
							})
					}
					else{
						setEmptyCart(true);
					}
				}
				else if(cartDetails.message === 'Failed authentication'){
					localStorage.clear();
					Swal.fire({
					title: "Session expired",
					icon: "error",
					text: "Please log in"
						});
					navigate('/');
				}
				else{
					setEmptyCart(false)
					setCartInfo(cartDetails.details);
					setCartTotal(cartDetails.totalAmount)
				}
			}).catch((error) => {
				return error.message;
			});
	}

	useEffect(() => {
		if(shouldLog.current){
			shouldLog.current = false;
			cartDetails(true);
		}
	}, [])

	function removeItem(cartid){
		fetch('https://git.heroku.com/code-eater-e-commerce.git' ,{
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				cartId: cartid
			})
		}).then((response) => {
			return response.json();
		}).then((removeItem) => {
			Swal.fire({
				title: "Successfully removed",
				icon: "success",
				text: `${removeItem.message}`
			})
			setTimeout(() => {
				cartDetails(false);
			}, 2000)
		}).catch((error) => {
			return error.message;
		})
	}

	function itemCheckout(){
		fetch('https://git.heroku.com/code-eater-e-commerce.git', {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then((response) => {
			return response.json();
		}).then((createOrder) => {
			fetch('https://git.heroku.com/code-eater-e-commerce.git', {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then((response) => {
				return response.json();
			}).then((removeAllCart) => {
				Swal.fire({
					title: "Created",
					icon: "success",
					text: `${createOrder.message}`
				})
				setTimeout(() => {
					cartDetails(false);
				}, 2000)
			})

		}).catch((error) => {
			return error.message;
		})
	}

	return(
			<>
				{
					userlvl === 'true' || userlvl === null
					?
					<>
						<Page404 />
					</>
					:
					userlvl === 'false' && emptyCart
					?
					<>
						<EmptyForm form='carts'/>
					</>
					:
					<>
						<Row>
							{cartInfo.map((items, index) => {
								return(
										<CartForm key={items._id} idHide={true} cartId={items._id} orderNo={index+1} name={items.productName} quantity={items.quantity} total={items.total} remove={() => {removeItem(items._id)}}/>
									)
							})}
						</Row>
						

							<div style={{marginBottom: '30px',
								marginTop: '20px',
								textAlign: 'right'}}>
								<h4 className="cartPage-h4">Total price: {cartTotal}</h4>
							</div>

							<div style={{textAlign: 'right', marginRight: '20px'}}>
								<Button variant="success" className="check-btn" onClick={itemCheckout}>Proceed to check out</Button>
							</div>
					</>
				}
			</>
		)
}