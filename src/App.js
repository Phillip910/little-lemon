import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './header';
import Nav from './nav';
import Main from './main';
import Footer from './footer';
import './nav.css';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<Main />} />
        <Route path="/menu" element={<Main />} />
        <Route path="/reservations" element={<Main />} />
        <Route path="/order-online" element={<Main />} />
        <Route path="/login" element={<Main />} />
      </Routes>
      <Footer />
      </Router>
  );
  }

export default App;
