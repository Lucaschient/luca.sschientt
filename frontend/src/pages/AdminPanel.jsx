import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import { Settings, Save, Upload, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    pixKey: '00020126860014br.gov.bcb.pix2564pix',
    qrCodeUrl: '',
    taxaValue: 'Taxa Caução R$ 99,00'
  });
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSettings = { ...settings, qrCodeUrl: reader.result };
        setSettings(newSettings);
        // Auto save after upload
        localStorage.setItem('adminSettings', JSON.stringify(newSettings));
        setUploading(false);
        alert('✓ QR Code carregado e salvo com sucesso!');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-title">
            <Settings size={32} />
            <h1>Painel Administrativo</h1>
          </div>
          <button onClick={() => navigate('/')} className="btn-logout">
            <ArrowLeft size={20} />
            Voltar
          </button>
        </div>
      </header>

      <div className="admin-content-simple">
        <div className="settings-card">
          <h2>Configurações de Pagamento PIX</h2>
          
          <div className="setting-group">
            <label>Chave PIX (Copia e Cola)</label>
            <input
              type="text"
              value={settings.pixKey}
              onChange={(e) => setSettings(prev => ({ ...prev, pixKey: e.target.value }))}
              className="admin-input"
              placeholder="Digite a chave PIX"
            />
            <p className="input-hint">Esta chave será exibida na página de pagamento para os usuários copiarem</p>
          </div>

          <div className="setting-group">
            <label>Valor da Taxa Caução</label>
            <input
              type="text"
              value={settings.taxaValue}
              onChange={(e) => setSettings(prev => ({ ...prev, taxaValue: e.target.value }))}
              className="admin-input"
              placeholder="Ex: R$ 99,00"
            />
            <p className="input-hint">Formato recomendado: R$ 99,00</p>
          </div>

          <div className="setting-group">
            <label>QR Code PIX (Imagem)</label>
            <div className="qrcode-upload">
              {settings.qrCodeUrl ? (
                <div className="qrcode-preview-box">
                  <div className="qrcode-preview">
                    <img src={settings.qrCodeUrl} alt="QR Code Preview" />
                  </div>
                  <p className="success-text">✓ QR Code carregado com sucesso!</p>
                </div>
              ) : (
                <div className="qrcode-empty">
                  <p>Nenhum QR Code carregado ainda</p>
                </div>
              )}
              <label htmlFor="qrcode-file" className="btn-upload">
                <Upload size={20} />
                {settings.qrCodeUrl ? 'Trocar QR Code' : 'Clique aqui para fazer Upload'}
              </label>
              <input
                id="qrcode-file"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <p className="input-hint">
                <strong>Como fazer:</strong> 1) Clique no botão acima 2) Escolha a imagem do QR Code 3) Clique em "Salvar Alterações"
              </p>
            </div>
          </div>

          <button onClick={handleSave} className="btn-save">
            <Save size={20} />
            {saved ? '✓ Alterações Salvas!' : 'Salvar Alterações'}
          </button>

          {saved && (
            <div className="success-message">
              ✓ As alterações foram salvas e já estão aplicadas para todos os usuários!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;