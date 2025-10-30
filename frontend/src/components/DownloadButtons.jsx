import React from 'react';
import './Components.css';
import { Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DownloadButtons = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [code, setCode] = React.useState('');

  const handleAdminClick = () => {
    setShowModal(true);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
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
      <div className="download-buttons">
        <button className="download-btn admin-access-btn" onClick={handleAdminClick}>
          <Apple className="btn-icon" size={20} />
          <span>baixar na app store</span>
        </button>
        <button className="download-btn">
          <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 20.4L20.3 12L3 3.6L3 10.5L14.3 12L3 13.5L3 20.4Z" fill="currentColor"/>
          </svg>
          <span>baixar na google play</span>
        </button>
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

export default DownloadButtons;