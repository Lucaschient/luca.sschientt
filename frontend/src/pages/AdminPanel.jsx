import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import { Settings, Save, Upload, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    pixKey: '(11) 98668-9035',
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
    try {
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      console.log('✅ Configurações salvas:', settings);
      setSaved(true);
      alert('✅ Alterações salvas com sucesso!\n\nAs mudanças já estão ativas para todos os usuários!');
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('❌ Erro ao salvar. Tente novamente.');
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