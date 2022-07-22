import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import AppNav from './components/AppNav';
import Home from './components/Home';
// import UserForm from './components/UserForm';
import Page404 from './pages/Page404';
import LoginPage from './pages/LoginPage';
// import ProductsAdmin from './pages/ProductsAdmin';
// import ProductsPage from './pages/ProductsPage';
// import ProtectedRoute from './ProtectedRoute';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrderUser from './pages/OrderUser';
import OrderPage from './pages/OrderPage';

function App() {

  const userlvl = localStorage.getItem('admin');

  const objects = [
    {
      id: '1234',
      name: 'FF7',
      description: 'ff7',
      price: 1000.00
    },
  ]

  return (
    <>
      <BrowserRouter>
        <AppNav />
        <Container fluid>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/*<Route path="/products/user" element={<UserForm name='123' description='123' price={123} />} />*/}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/*<Route path="/cart" element={<CartPage />} />*/}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrderUser />} />
            {/*{ 
              userlvl === 'true' || userlvl === null
              ?
              <>
                <Route path="/cart" element={<Page404 />} />
              </>
              :
            }
            {
              userlvl === null
              ?
              <>
                <Route path="/orders" element={<Page404 />} />
              </>
              :
              <>
              </>
            }*/}
            <Route path="*" element={<Page404 />}/>
 {/*           <Route path="/products_user" element={<ProductsPage />} />*/}
            {/*{userlvl === 'true'
            ?
            <Route path="/products_admin" element={<ProductsAdmin />}/>
            :
            <Route path="/products_user" element={<ProductsPage />}/>
            }*/}
          </Routes>
          {/*<ProtectedRoute path="/products_admin" component={ProductsAdmin} auth={false} />*/}

        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
