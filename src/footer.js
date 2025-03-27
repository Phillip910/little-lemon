import Logo from './logo512.png';

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