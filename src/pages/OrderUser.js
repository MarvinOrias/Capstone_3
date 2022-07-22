import React, {useState, useEffect, useRef} from 'react';
import {Row, Button} from 'react-bootstrap';
import Swal from 'sweetalert2';
import {useNavigate, Navigate} from 'react-router-dom';

import OrderForm from '../components/OrderForm';
import EmptyForm from '../components/EmptyForm';
import Page404 from './Page404';
import Details from '../components/Details';

export default function CartPage(){
	const userlvl = localStorage.getItem('admin');
	const token = localStorage.getItem('token');

	const [orderInfo, setOrderInfo] = useState([]);
	const [emptyOrder, setEmptyOrder] = useState(false);

	const shouldLog = useRef(true);
	const navigate = useNavigate();


	function orderDetails(isShow){
		fetch('http://localhost:4000/orders/orders-user', {
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
				console.log(orders.result)
				/*for(let i=0; i<=orders.result.length-1; i++){
					console.log(orders.result[i].orderDetails)
					for(let o=0; o<=orders.result[i].orderDetails.length-1; o++){
						console.log(orders.result[i].orderDetails[o].productName)
						setDetails(orders.result[i].orderDetails[o].productName)
					}
				}*/
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
		fetch('http://localhost:4000/orders/cancel-order', {
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
					userlvl == null
					?
					<>
						<Page404 />
					</>
					:
					userlvl == 'false' && emptyOrder
					?
					<>
						<EmptyForm form='orders'/>
					</>
					:
					<>
						<Row>
							{orderInfo.map((items, index) => {
								return(
										<OrderForm key={items._id} orderId={items._id} price={items.total} details={items.orderDetails.map((details) => {return ` Product Name: ${details.productName} -- Quantity: ${details.quantity}pc(s) -- Total: ${details.total} -- `})} userIdHide={true} price={items.amountToPay} date={items.createdOn.replace('T', ' ').replace('Z', ' ')} status={items.status} cancelBtnHide={items.status === 'Canceled' ? true : false} cancelBtn={() => {cancelOrder(items._id)}} pendingBtnHide={true} successBtnHide={true} />
									)
							})}
						</Row>
					</>
				}
			</>
		)
} 