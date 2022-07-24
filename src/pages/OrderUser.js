import React, {useState, useEffect, useRef} from 'react';
import {Row} from 'react-bootstrap';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

import OrderForm from '../components/OrderForm';
import EmptyForm from '../components/EmptyForm';
import Page404 from './Page404';

export default function CartPage(){
	const userlvl = localStorage.getItem('admin');
	const token = localStorage.getItem('token');

	const [orderInfo, setOrderInfo] = useState([]);
	const [emptyOrder, setEmptyOrder] = useState(false);

	const shouldLog = useRef(true);
	const navigate = useNavigate();


	function orderDetails(isShow){
		fetch('https://git.heroku.com/code-eater-e-commerce.git', {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then((response) => {
				return response.json();
			}).then((orders) => {
				if(orders.message === `User's order is empty`){
					if(isShow){
						setEmptyOrder(true);
						Swal.fire({
								title: "Empty",
								icon: "warning",
								text: "Your order is empty"
							})
					}
					else{
						setEmptyOrder(true);
					}
				}
				else if(orders.message === 'Failed authentication'){
					localStorage.clear();
					Swal.fire({
					title: "Error",
					icon: "error",
					text: "Please log again"
						});
					navigate('/');
				}
				else{
					setEmptyOrder(false)
					setOrderInfo(orders.result);
				}
			}).catch((error) => {
				return error.message;
			});	
	}

	useEffect(() => {
		if(shouldLog.current){
			shouldLog.current = false;
			orderDetails(true);
		}
	}, [token])

	function cancelOrder(orderid){
		fetch('https://git.heroku.com/code-eater-e-commerce.git', {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				orderId: orderid
			})
		}).then((response) => {
			return response.json();
		}).then((cancelOrders) => {
			Swal.fire({
					title: "Success",
					icon: "success",
					text: `${cancelOrders.message}`
						});
			setTimeout(() => {
				orderDetails();
			}, 2000);
		}).catch((error) => {
			return error.message;
		})
	}

	return(
			<>
				{
					userlvl === null
					?
					<>
						<Page404 />
					</>
					:
					userlvl === 'false' && emptyOrder
					?
					<>
						<EmptyForm form='orders'/>
					</>
					:
					<>
						<Row>
							{orderInfo.map((items, index) => {
								return(
										<OrderForm key={items._id} orderId={items._id} price={items.total} details={items.orderDetails.map((details) => {return <> <div>Product Name: {details.productName}</div> <div>Quantity: {details.quantity}</div> <div>Price: {details.total}</div> </> })} userIdHide={true} price={items.amountToPay} date={items.createdOn.replace('T', ' ').replace('Z', ' ')} status={items.status} cancelBtnHide={items.status === 'Canceled' || items.status === 'Delivered' ? true : false} cancelBtn={() => {cancelOrder(items._id)}} pendingBtnHide={true} successBtnHide={true} />
									)
							})}
						</Row>
					</>
				}
			</>
		)
} 