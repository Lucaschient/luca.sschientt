import React from 'react';
import './Components.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <span className="logo-o">O</span>
        <span className="logo-l">L</span>
        <span className="logo-x">X</span>
      </div>
      <div className="footer-text">
        <p>OLX © 2024 - todos os direitos reservados - OLX S.A.</p>
        <p>CNPJ: 11.818.248/0001-80</p>
        <p>Rua do Catete, 359, Flamengo - 22220-001 - Rio de Janeiro, RJ</p>
      </div>
    </footer>
  );
};

export default Footer;