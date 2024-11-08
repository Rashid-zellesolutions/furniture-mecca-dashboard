// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="Footer">
      <div className='FooterMainClass'>
      <span className='leftNote'>
        © 2024
        <p>
          <a href="https://zellesolutions.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            Zelle Solutions </a>
        </p>
        . All Rights Reserved.
      </span>
      <span className='rightNote'>
        {' '}
        <Link to="/Dashboard" className="footer-link"> {/* Add Link for internal navigation */}
          FAQ
        </Link>
        {' '}
        /
        {' '}
        <Link to="/Pages" className="footer-link"> {/* Add Link for internal navigation */}
          HELP?
        </Link>
      </span>
      </div>
    </footer>
  );
}

export default Footer;
