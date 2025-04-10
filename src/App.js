import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './nav';
import Main from './main';
import Footer from './footer';
import './nav.css';
import BookingPage from './BookingPage';
import { menu } from './menu';
import MenuPage from './MenuPage';
import About from './about';
import Login from './login';
import OrderOnline from './order-online';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/BookingPage" element={<BookingPage/>} />
        <Route path="/order-online" element={<OrderOnline />} />
        <Route path="/login" element={<Login />} />
        <Route path='/Confirmation' element={<Main />} />
        <Route path='/menu/:category' element={<Main />} />
        <Route path='/menu/:category/:item' element={<Main />} />
       
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
