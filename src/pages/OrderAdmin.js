import React, {useState, useEffect, useRef} from 'react';
import {Row, Button} from 'react-bootstrap';
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
		fetch('http://localhost:4000/orders/all', {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then((response) => {
				return response.json();
			}).then((orders) => {
				if(orders.message === `No records found`){
					if(isShow){
						setEmptyOrder(true);
						Swal.fire({
								title: "Empty",
								icon: "warning",
								text: `${orders.message}`
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

	function updateOrder(orderid, status){
		fetch('http://localhost:4000/orders/update-order-admin', {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				orderId: orderid,
				status: status
			})
		}).then((response) => {
			return response.json();
		}).then((updateOrders) => {
			Swal.fire({
					title: "Success",
					icon: "success",
					text: `${updateOrders.message}`
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
					userlvl == 'true' && emptyOrder
					?
					<>
						<EmptyForm form='orders'/>
					</>
					:
					<>
						<Row>
							{orderInfo.map((items, index) => {
								return(
										<OrderForm key={items._id} orderId={`${items._id}, User ID: ${items.userId}`} userIdHide={false} userId={items.userId} price={items.total} details={items.orderDetails.map((details) => {return <> <div>Product Name: {details.productName}</div> <div>Quantity: {details.quantity}</div> <div>Price: {details.total}</div> </> })} userIdHide={true} price={items.amountToPay} date={items.createdOn.replace('T', ' ').replace('Z', ' ')} status={items.status} cancelBtnHide={true} pendingBtnHide={items.status === 'Pending' ? true : false} pendingBtn={()=>{updateOrder(items._id,'Pending')}} successBtnHide={items.status === 'Delivered' ? true : false} successBtn={() => {updateOrder(items._id, 'Delivered')}}/>
									)
							})}
						</Row>
					</>
				}
			</>
		)
} 