import './NavBar.css';
import { useState } from 'react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-container">
      <div className='logo-container'>
        <p>TD</p>
      </div>

      <button className="hamburger" onClick={toggleMenu}>
        <span className={isMenuOpen ? 'active' : ''}></span>
        <span className={isMenuOpen ? 'active' : ''}></span>
        <span className={isMenuOpen ? 'active' : ''}></span>
      </button>

      <div className={`navbar-link-container ${isMenuOpen ? 'active' : ''}`}>
        <a onClick={() => setIsMenuOpen(false)}>Home</a>
        <a onClick={() => setIsMenuOpen(false)}>About</a>
        <a onClick={() => setIsMenuOpen(false)}>Contact</a>
        <a onClick={() => setIsMenuOpen(false)}>Events</a>
      </div>

      <button className="login-btn">Login</button>
    </div>
  );
};

export default NavBar;