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
	const [loadedCart, setLoadedCart] = useState([])
	const [emptyCart, setEmptyCart] = useState(false);
	const [mapCart, setMapCart] = useState(false);
	const [cartTotal, setCartTotal] = useState(0);
	const [failedAuth, setFailedAuth] = useState('');

	const shouldLog = useRef(true);
	const navigate = useNavigate();

	/*function userDetails(){
		
	}
*/


	function cartDetails(isShow){
		fetch('http://localhost:4000/users/cart-details', {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then((response) => {
				return response.json();
			}).then((cartDetails) => {
				if(cartDetails.message !== `User cart is empty`){
					setEmptyCart(false)
					setCartInfo(cartDetails.details);
					setCartTotal(cartDetails.totalAmount)
					setFailedAuth('Access granted');
				}
				else if(cartDetails.message === 'Failed authentication'){
					setFailedAuth(cartDetails.message);
				}
				else{
					if(isShow){
						setFailedAuth('Access granted');
						setEmptyCart(true);
						Swal.fire({
								title: "Empty",
								icon: "warning",
								text: "Your cart is empty"
							})
					}
					else{
						setFailedAuth('Access granted');
						setEmptyCart(true);
					}
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
	}, [token])

	function removeItem(cartid){
		fetch('http://localhost:4000/users/remove-cart-item' ,{
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
		fetch('http://localhost:4000/orders/create-order', {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then((response) => {
			return response.json();
		}).then((createOrder) => {
			fetch('http://localhost:4000/users/remove-all-item', {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then((response) => {
				return response.json();
			}).then((removeAllCart) => {
				Swal.fire({
					title: "Order created",
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

	/*if(loadedCart.length === 0){
		return(
				<EmptyForm form='cart' />
			)
	}
	else if(cartInfo.length !== 0){
		const newCart = cartInfo.map((items, index) => {
			return(
					<CartForm key={items._id} idHide={true} cartId={items._id} orderNo={index+1} name={items.productName} quantity={items.quantity} total={items.total} remove={() => {removeItem(items._id)}}/>
				)
		});
	}*/

	console.log(failedAuth)

	return(
			<>
				{
					userlvl == 'true' || userlvl == null
					?
					<>
						<Page404 />
					</>
					:
					userlvl == 'false' && emptyCart
					?
					<>
						<EmptyForm form='cart'/>
					</>
					:
					userlvl === 'false' && failedAuth === 'Failed authentication'
					?
						<>
							{
								Swal.fire({
								title: "Error",
								icon: "error",
								text: "Please log again"
									})
							}
							{
								localStorage.clear()
							}
							{
								navigate('/')
							}
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