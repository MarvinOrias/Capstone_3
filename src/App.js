import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import AppNav from './components/AppNav';
import Home from './components/Home';
import Page404 from './pages/Page404';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrderUser from './pages/OrderUser';
import OrderAdmin from './pages/OrderAdmin';
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
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="*" element={<Page404 />}/>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
