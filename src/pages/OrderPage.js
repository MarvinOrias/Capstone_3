import React, {useState, useEffect, useRef} from 'react';
import {Row, Button} from 'react-bootstrap';
import Swal from 'sweetalert2';

import OrderUser from './OrderUser';
import OrderAdmin from './OrderAdmin';
import Error404 from '../components/Error404';

export default function OrderPage(){

	const userlvl = localStorage.getItem('admin');

	return(
			<>
				{
					userlvl === 'true'
					?
					<>
						<OrderAdmin />
					</>
					:
					userlvl === 'false'
					?
					<>
						<OrderUser />
					</>
					:
					<>
						<Error404 />
					</>
				}
			</>
		)
} 