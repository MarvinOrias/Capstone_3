import React, {useState, useEffect, useRef} from 'react';
import {Row, Modal, Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import ProductsForm from '../components/ProductsForm';

export default function ProductsPage(){
	const [items, setItems] = useState([]);
	const userlvl = localStorage.getItem('admin');
	const token = localStorage.getItem('token');
	const [quantity, setQuantity] = useState(0);
	const shouldLog = useRef(true);
	const navigate = useNavigate();

	const [addShow, setAddShow] = useState(false);
	const [editShow, setEditShow] = useState(false);
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [price, setPrice] = useState(0);
	const [newName, setNewName] = useState('');
	const [newDesc, setNewDesc] = useState('');
	const [newPrice, setNewPrice] = useState(0);

	const fetchData = () => {
		fetch('https://code-eater-e-commerce.herokuapp.com/products/all')
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
		fetch('https://code-eater-e-commerce.herokuapp.com/users/cart', {
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
				if(addItem.message === 'Failed authentication'){
					localStorage.clear();
					Swal.fire({
					title: "Session expired",
					icon: "error",
					text: "Please log in"
						});
					navigate('/');
				}
				else{
					Swal.fire({
						title: "Successfully added",
						icon: "success",
						text: `${addItem.message}`
					});
					quantityValue(0);
					fetchData();
				}
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

	function editModal(value, id){
		setEditShow(value);
		setId(id);
	}

	function editBtn(prodName, prodDesc, prodPrice){
		if(prodName === '' || prodDesc === '' || prodPrice === 0){
			Swal.fire({
			title: "Oops",
			icon: "warning",
			text: "All fields required"
				});
		}
		else{
			fetch('https://code-eater-e-commerce.herokuapp.com/products/update',{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type":"application/json"
				},
				body: JSON.stringify({
					id: id,
					name: prodName,
					description: prodDesc,
					price: prodPrice
					})
				}).then((response) => {
					return response.json();
				}).then((editItem) => {
					if(editItem.message === 'Failed authentication'){
						localStorage.clear();
						Swal.fire({
						title: "Session expired",
						icon: "error",
						text: "Please log in"
							});
						navigate('/');
					}
					else if(editItem.message === 'Product not found'){
						Swal.fire({
						title: "Error",
						icon: "error",
						text: `${editItem.message}`
							});
					}
					else{
						Swal.fire({
						title: "Updated",
						icon: "success",
						text: `${editItem.message}`
							});
						setId('');
						setName('');
						setDesc('');
						setPrice(0);
						editModal(false);
						setTimeout(() => {
							fetchData();
						}, 2000)
					}
				}).catch((error) => {
					return error.message;
				})
		}
	}

	function archiveBtn(prodId){
		fetch('https://code-eater-e-commerce.herokuapp.com/products/archive', {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				id: prodId
			})
		}).then((response) => {
			return response.json();
		}).then((archive) => {
			if(archive.message === 'Failed authentication'){
				localStorage.clear();
				Swal.fire({
				title: "Session expired",
				icon: "error",
				text: "Please log in"
					});
				navigate('/');
			}
			else if(archive.message === 'Product not found'){
				Swal.fire({
				title: "Not found",
				icon: "error",
				text: `${archive.message}`
					});
			}
			else{
				Swal.fire({
				title: "Updated",
				icon: "success",
				text: `${archive.message}`
					});
				setTimeout(() => {
					fetchData();
				}, 2000);
			}
		}).catch((error) => {
			return error.message;
		})
	}

	function activeBtn(prodId){
		fetch('https://code-eater-e-commerce.herokuapp.com/products/active', {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				id: prodId
			})
		}).then((response) => {
			return response.json();
		}).then((archive) => {

				if(archive.message === 'Failed authentication'){
					localStorage.clear();
					Swal.fire({
					title: "Session expired",
					icon: "error",
					text: "Please log in"
						});
					navigate('/');
				}
				else if(archive.message === 'Product not found'){
					Swal.fire({
					title: "Not found",
					icon: "error",
					text: `${archive.message}`
						});
				}
				else{
						Swal.fire({
						title: "Updated",
						icon: "success",
						text: `${archive.message}`
							});
						setTimeout(() => {
							fetchData();
						}, 2000);
				}
		}).catch((error) => {
			return error.message;
		})
	}

	function addModal(value){
		setAddShow(value)
	}

	function newItem(prodName, prodDesc, prodPrice){
		if(prodName === '' || prodDesc === '' || prodPrice === 0){
			Swal.fire({
			title: "Oops",
			icon: "warning",
			text: "All fields required"
				});
		}
		else{
			fetch('https://code-eater-e-commerce.herokuapp.com/products/create', {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type":"application/json"
				},
				body: JSON.stringify({
					name: prodName,
					description: prodDesc,
					price: prodPrice
				})
			}).then((response) => {
				return response.json();
			}).then((newItem) => {
				if(newItem.message === 'Failed authentication'){
					localStorage.clear();
					Swal.fire({
					title: "Session expired",
					icon: "error",
					text: "Please log in"
						});
					navigate('/');
				}
				else if(newItem.message === 'Account not created'){
					Swal.fire({
					title: "Error",
					icon: "error",
					text: `${newItem.message}`
						});
				}
				else{
					Swal.fire({
					title: "Updated",
					icon: "success",
					text: `${newItem.message}`
						});
					setNewName('');
					setNewDesc('');
					setNewPrice(0);
					addModal(false);
					setTimeout(() => {
						fetchData();
					}, 2000)
				}
			}).catch((error) => {
				return error.message;
			})
		}
	}

	const loadedData = items.map((products) => {
		if(token !== null && userlvl === 'true'){
			return(
				<>
					<ProductsForm key={products._id} id={products._id} name={products.name} description={products.description} isActive={`${products.isActive}`} price={products.price} quantityHide={true} edit={() => {editModal(true, products._id)}} addBtnHide={true} activeBtnHide={products.isActive ? true : false} active={()=>{activeBtn(products._id)}} archiveBtnHide={products.isActive === false ? true : false} archive={() => {archiveBtn(products._id)}} />
				</>
			)
		}
		else{
			if(products.isActive === true){
				return(
						<ProductsForm key={products._id} idHide={true} id={products._id} name={products.name} description={products.description} isActiveHide={true} price={products.price} add={() => {addBtn(products._id, quantity)}} quantity={quantityValue} editBtnHide={true} activeBtnHide={true} archiveBtnHide={true} />
					)
			}
		}
	})

	return(
			<>
				{
					userlvl === 'true'
					?
					<>
						<div style={{textAlign: 'right'}}>
							<Button variant="outline-info" className="mt-3 me-4" onClick={() => {addModal(true)}}>
								Add new item
							</Button>
						</div>

						<Row>
							{loadedData}
						</Row>
					</>
					:
					<Row>
						{loadedData}
					</Row>
				}

			{/*add new item modal*/}
			<Modal show={addShow} onHide={() => {addModal(false)}}>
			        <Modal.Header closeButton>
			          <Modal.Title>Add new item</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
			        	<Form>
			        	      <Form.Group className="mb-3">
			        	        <Form.Label>Name:</Form.Label>
			        	        <Form.Control type="text" onChange={(e) => {setNewName(e.target.value)}} />
			        	      </Form.Group>

			        	      <Form.Group className="mb-3">
			        	        <Form.Label>Description</Form.Label>
			        	        <Form.Control type="text" onChange={(e) => {setNewDesc(e.target.value)}} />
			        	      </Form.Group>

			        	      <Form.Group className="mb-3">
			        	        <Form.Label>Price</Form.Label>
			        	        <Form.Control type="number" onChange={(e) => {setNewPrice(e.target.value)}} />
			        	      </Form.Group>
			        	    </Form>
			        </Modal.Body>
			        <Modal.Footer>
			          <Button variant="outline-success" onClick={() => {newItem(newName, newDesc, newPrice)}}>
			            Save Changes
			          </Button>
			          <Button variant="secondary" onClick={() => {addModal(false)}}>
			            Cancel
			          </Button>
			        </Modal.Footer>
			      </Modal>	     

			{/*edit item modal*/}
				<Modal show={editShow} onHide={() => {editModal(false)}}>
				        <Modal.Header closeButton>
				          <Modal.Title>Update details</Modal.Title>
				        </Modal.Header>
				        <Modal.Body>
				        	<Form>
				        	      <Form.Group className="mb-3" controlId="formBasicName">
				        	        <Form.Label>Name:</Form.Label>
				        	        <Form.Control type="text" onChange={(e) => {setName(e.target.value)}} />
				        	      </Form.Group>

				        	      <Form.Group className="mb-3" controlId="formBasicDescription">
				        	        <Form.Label>Description</Form.Label>
				        	        <Form.Control type="text" onChange={(e) => {setDesc(e.target.value)}} />
				        	      </Form.Group>

				        	      <Form.Group className="mb-3" controlId="formBasicPrice">
				        	        <Form.Label>Price</Form.Label>
				        	        <Form.Control type="number" onChange={(e) => {setPrice(e.target.value)}} />
				        	      </Form.Group>
				        	    </Form>
				        </Modal.Body>
				        <Modal.Footer>
				          <Button variant="outline-success" onClick={() => {editBtn(name, desc, price)}}>
				            Save Changes
				          </Button>
				          <Button variant="secondary" onClick={() => {editModal(false)}}>
				            Cancel
				          </Button>
				        </Modal.Footer>
				      </Modal>	      
			</>
		)
}