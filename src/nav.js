import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';


function Nav() {
  return (
    <nav>
          <img src="/LittleLemonlogo.png" alt="Logo" style={{ height: "50px" }} />
          <ul>
              <li>
                  <Link to="/">Home</Link>
              </li>
              <li>
                  <Link to="/about">About</Link>
              </li>
              <li>
                  <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to ="/reservations">Reservations</Link>
              </li>
              <li>
                <Link to ="/order-online">Order Online</Link>
              </li>
              <li>  
                <Link to ="/login">login</Link>
              </li>
          </ul>
    </nav>
  );
}

export default Nav;