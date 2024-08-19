import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleInfo, faEnvelope, faBars, faTimes, faIndianRupeeSign, faUser, faBlog } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">Intelli</Link>
      </div>
      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className='menu-button'>
          {menuOpen ? <FontAwesomeIcon icon={faTimes} onClick={closeMenu} /> : <FontAwesomeIcon icon={faBars} />}
        </div><small>Menu</small>
      </div>
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><NavLink to="/" onClick={closeMenu}><FontAwesomeIcon icon={faHome} /> <span className='nav-text'>Home</span></NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}><FontAwesomeIcon icon={faCircleInfo} /> <span className='nav-text'>About</span></NavLink></li>
          <li><NavLink to="/blog" onClick={closeMenu}><FontAwesomeIcon icon={faBlog} /> <span className='nav-text'>Blog</span></NavLink></li>
          <li><NavLink to="/contact" onClick={closeMenu}><FontAwesomeIcon icon={faEnvelope} /> <span className='nav-text'>Contact</span></NavLink></li>
        </ul>
      </div>
      <div className="user">
        <NavLink to="/login" onClick={closeMenu}><FontAwesomeIcon icon={faUser} /> <span className='user-text-login'>Log in</span></NavLink>
      </div>
    </div>
  );
};

export default Header;
