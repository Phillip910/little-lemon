import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './nav';
import Main from './main';
import Footer from './footer';
import './nav.css';
import BookingPage from './BookingPage';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<Main />} />
        <Route path="/menu" element={<Main />} />
        <Route path="/BookingPage" element={<BookingPage/>} />
        <Route path="/order-online" element={<Main />} />
        <Route path="/login" element={<Main />} />
        <Route path='/Confirmation' element={<Main />} />
      </Routes>
      <Footer />
      </Router>
  );
  }

export default App;
