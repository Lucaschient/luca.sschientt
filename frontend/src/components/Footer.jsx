import React, { useState } from 'react';
import './Components.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSecretClick = () => {
    setShowModal(true);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    // Código de acesso: 1234567
    if (code === '1234567') {
      navigate('/admin');
      setShowModal(false);
      setCode('');
    } else {
      alert('Código incorreto!');
      setCode('');
    }
  };

  return (
    <>
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
        {/* Botão secreto - discreto */}
        <div className="secret-access" onClick={handleSecretClick}>
          Admin
        </div>
      </footer>

      {/* Modal de código */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Acesso Administrativo</h3>
            <form onSubmit={handleCodeSubmit}>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Digite o código"
                className="code-input"
                autoFocus
              />
              <div className="modal-buttons">
                <button type="submit" className="btn-confirm">Entrar</button>
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;