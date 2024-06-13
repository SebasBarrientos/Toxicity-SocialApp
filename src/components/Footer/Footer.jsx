import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-links">
          <Link to="https://github.com/SebasBarrientos" className="footer-link">Sebastian Barrientos</Link>
          <Link to="https://github.com/AgustinErimbaue" className="footer-link">Agustin Erimbaue</Link>
        </div>
        <div >
          <p>&copy; 2024 Toxicity. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
