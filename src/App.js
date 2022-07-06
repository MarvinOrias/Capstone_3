import React from 'react';
import {Container} from 'react-bootstrap';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AppNav from './components/AppNav';
import Home from './pages/Home';
import Page404 from './pages/Page404';

function App() {

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
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
