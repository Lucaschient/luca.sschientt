import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import { Lock, Settings, Save, Upload, Eye, EyeOff } from 'lucide-react';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    pixKey: '00020126860014br.gov.bcb.pix2564pix',
    qrCodeUrl: '',
    taxaValue: 'R$ 99,00',
    whatsappLink: 'https://wa.me/qr/ZQR4YAWICI7GM1'
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }

    // Load saved settings
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check (change this to your desired password)
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setPassword('');
  };

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, qrCodeUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-card">
          <div className="login-header">
            <Lock size={48} className="lock-icon" />
            <h1>Painel Administrativo</h1>
            <p>Entre com sua senha para acessar</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button type="submit" className="btn-login">
              Entrar
            </button>
          </form>
          <p className="login-hint">Senha padrão: admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-title">
            <Settings size={32} />
            <h1>Painel Administrativo</h1>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </header>

      <div className="admin-content">
        <div className="settings-card">
          <h2>Configurações de Pagamento</h2>
          
          <div className="setting-group">
            <label>Chave PIX</label>
            <input
              type="text"
              value={settings.pixKey}
              onChange={(e) => setSettings(prev => ({ ...prev, pixKey: e.target.value }))}
              className="admin-input"
              placeholder="Digite a chave PIX"
            />
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
          </div>

          <div className="setting-group">
            <label>QR Code PIX</label>
            <div className="qrcode-upload">
              {settings.qrCodeUrl && (
                <div className="qrcode-preview">
                  <img src={settings.qrCodeUrl} alt="QR Code Preview" />
                </div>
              )}
              <label htmlFor="qrcode-file" className="btn-upload">
                <Upload size={20} />
                {settings.qrCodeUrl ? 'Trocar QR Code' : 'Upload QR Code'}
              </label>
              <input
                id="qrcode-file"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="setting-group">
            <label>Link do WhatsApp (Enviar Comprovante)</label>
            <input
              type="text"
              value={settings.whatsappLink}
              onChange={(e) => setSettings(prev => ({ ...prev, whatsappLink: e.target.value }))}
              className="admin-input"
              placeholder="https://wa.me/..."
            />
          </div>

          <button onClick={handleSave} className="btn-save">
            <Save size={20} />
            {saved ? 'Salvo com sucesso!' : 'Salvar Alterações'}
          </button>
        </div>

        <div className="info-card">
          <h3>Informações</h3>
          <ul>
            <li>Todas as alterações são aplicadas imediatamente para todos os usuários</li>
            <li>O QR Code será exibido na página de pagamento</li>
            <li>A chave PIX pode ser copiada pelos usuários</li>
            <li>O link do WhatsApp abre quando o usuário clicar em "Enviar Comprovante"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;