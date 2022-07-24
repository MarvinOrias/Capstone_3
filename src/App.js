import React from 'react';
import {Container} from 'react-bootstrap';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AppNav from './components/AppNav';
import Home from './components/Home';
import Page404 from './pages/Page404';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';

function App() {

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
