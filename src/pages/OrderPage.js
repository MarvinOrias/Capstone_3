import React, {useState, useEffect, useRef} from 'react';
import {Row, Button} from 'react-bootstrap';
import Swal from 'sweetalert2';

import CartForm from '../components/CartForm';
import EmptyForm from '../components/EmptyForm';
import OrderForm from '../components/OrderForm';

export default function OrderPage(){
	const userlvl = localStorage.getItem('admin');
	const token = localStorage.getItem('token');

	const [cartInfo, setCartInfo] = useState([]);
	const [emptyCart, setEmptyCart] = useState(false);
	const [cartTotal, setCartTotal] = useState(0);

	const shouldLog = useRef(true);

	

	return(
			<>
				<OrderForm />
			</>
		)
} 