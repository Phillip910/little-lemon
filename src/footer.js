import React from 'react';
import './footer.css'; // Adjust the path to the correct location of the CSS file


function Footer() {
  return (
    <footer>
      <img src="/LittleLemonlogo.png" alt="Logo" style={{ height: "50px" }} /> {/* Reference from public folder */}
      <h1>Little Lemon</h1>
      <p>1234 Lemon St.</p>
      <p>Seattle, WA 98101</p>
      <p>Footer</p>
    </footer>
  );
}

export default Footer;