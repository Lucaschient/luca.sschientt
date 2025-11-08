import React, { useState } from 'react';
import './Components.css';
import { useNavigate } from 'react-router-dom';

const OLXLogo = () => {
  const navigate = useNavigate();
  const [clicks, setClicks] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');

  const handleLogoClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    
    // Se clicar 5 vezes rápido, abre modal admin
    if (newClicks === 5) {
      setShowModal(true);
      setClicks(0);
    }
    
    // Reset contador após 2 segundos
    setTimeout(() => setClicks(0), 2000);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code === 'relativo2') {
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
      <div className="olx-logo-header">
        <div className="olx-logo" onClick={handleLogoClick} style={{cursor: 'pointer'}}>
          <span className="logo-o">O</span>
          <span className="logo-l">L</span>
          <span className="logo-x">X</span>
        </div>
      </div>

      {/* Modal de código admin */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Acesso Administrativo</h3>
            <p className="modal-subtitle">Digite o código de acesso</p>
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

export default OLXLogo;