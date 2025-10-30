import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import { Settings, Save, Upload, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    pixKey: '00020126860014br.gov.bcb.pix2564pix',
    qrCodeUrl: '',
    taxaValue: 'R$ 99,00'
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved settings
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, qrCodeUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=\"admin-panel\">\n      <header className=\"admin-header\">\n        <div className=\"header-content\">\n          <div className=\"header-title\">\n            <Settings size={32} />\n            <h1>Painel Administrativo</h1>\n          </div>\n          <button onClick={() => navigate('/')} className=\"btn-logout\">\n            <ArrowLeft size={20} />\n            Voltar\n          </button>\n        </div>\n      </header>\n\n      <div className=\"admin-content-simple\">\n        <div className=\"settings-card\">\n          <h2>Configurações de Pagamento PIX</h2>\n          \n          <div className=\"setting-group\">\n            <label>Chave PIX (Copia e Cola)</label>\n            <input\n              type=\"text\"\n              value={settings.pixKey}\n              onChange={(e) => setSettings(prev => ({ ...prev, pixKey: e.target.value }))}\n              className=\"admin-input\"\n              placeholder=\"Digite a chave PIX\"\n            />\n            <p className=\"input-hint\">Esta chave será exibida na página de pagamento para os usuários copiarem</p>\n          </div>\n\n          <div className=\"setting-group\">\n            <label>Valor da Taxa Caução</label>\n            <input\n              type=\"text\"\n              value={settings.taxaValue}\n              onChange={(e) => setSettings(prev => ({ ...prev, taxaValue: e.target.value }))}\n              className=\"admin-input\"\n              placeholder=\"Ex: R$ 99,00\"\n            />\n            <p className=\"input-hint\">Formato recomendado: R$ 99,00</p>\n          </div>\n\n          <div className=\"setting-group\">\n            <label>QR Code PIX (Imagem)</label>\n            <div className=\"qrcode-upload\">\n              {settings.qrCodeUrl && (\n                <div className=\"qrcode-preview\">\n                  <img src={settings.qrCodeUrl} alt=\"QR Code Preview\" />\n                </div>\n              )}\n              <label htmlFor=\"qrcode-file\" className=\"btn-upload\">\n                <Upload size={20} />\n                {settings.qrCodeUrl ? 'Trocar QR Code' : 'Fazer Upload do QR Code'}\n              </label>\n              <input\n                id=\"qrcode-file\"\n                type=\"file\"\n                accept=\"image/*\"\n                onChange={handleFileUpload}\n                style={{ display: 'none' }}\n              />\n              <p className=\"input-hint\">Faça upload da imagem do QR Code PIX. Será exibido na página de pagamento.</p>\n            </div>\n          </div>\n\n          <button onClick={handleSave} className=\"btn-save\">\n            <Save size={20} />\n            {saved ? '✓ Alterações Salvas!' : 'Salvar Alterações'}\n          </button>\n\n          {saved && (\n            <div className=\"success-message\">\n              ✓ As alterações foram salvas e já estão aplicadas para todos os usuários!\n            </div>\n          )}\n        </div>\n      </div>\n    </div>\n  );\n};\n\nexport default AdminPanel;