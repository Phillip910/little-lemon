import React from 'react';
import './nav.css';


function Nav() {
  return (
    <nav>
          <img src="/LittleLemonlogo.png" alt="Logo" style={{ height: "50px" }} />
          <ul>
              <li>
                  <a href="/">Home</a>
              </li>
              <li>
                  <a href="/about">About</a>
              </li>
              <li>
                  <a href="/menu">Menu</a>
              </li>
              <li>
                <a href ="/reservations">Reservations</a>
              </li>
              <li>
                <a href ="/order-online">Order Online</a>
              </li>
              <li>  
                <a href ="/login">login</a>
              </li>
          </ul>
    </nav>
  );
}

export default Nav;