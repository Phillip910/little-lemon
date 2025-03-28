import './footer.css'; // Adjust the path to the correct location of the CSS file
import Logo from './assets/LittleLemonlogo.png';

function Footer() {
  return (
    <footer>
        <img src={Logo} alt="Logo" style={{ height: "50px" }} />
        <h1>Little Lemon</h1>
        <p>1234 Lemon St.</p>
        <p>Seattle, WA 98101</p>
      <p>Footer</p>
    </footer>
  );
}

export default Footer;
// Compare this snippet from little-lemon/src/header.js: