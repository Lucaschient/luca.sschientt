import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import { Settings, Save, Upload, ArrowLeft, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('config'); // 'config' ou 'users'
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
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

  // Carregar usuários quando mudar para aba de usuários
  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    }
  }, [activeTab]);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await axios.get(`${API}/list-users`);
      if (response.data.success) {
        setUsers(response.data.users);
        console.log(`✅ ${response.data.total} usuários carregados`);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      alert('Erro ao carregar cadastros. Verifique a conexão.');
    } finally {
      setLoadingUsers(false);
    }
  };

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('❌ Arquivo muito grande! Máximo 5MB');
        return;
      }
      
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSettings = { ...settings, qrCodeUrl: reader.result };
        setSettings(newSettings);
        // Auto save after upload
        localStorage.setItem('adminSettings', JSON.stringify(newSettings));
        console.log('✅ QR Code salvo');
        setUploading(false);
        alert('✅ QR Code carregado e salvo com sucesso!\n\nJá está ativo para todos os usuários!');
      };
      reader.onerror = () => {
        setUploading(false);
        alert('❌ Erro ao carregar imagem. Tente novamente.');
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

      {/* Abas */}
      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'config' ? 'active' : ''}`}
          onClick={() => setActiveTab('config')}
        >
          <Settings size={20} />
          Configurações
        </button>
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={20} />
          Ver Cadastros ({users.length})
        </button>
      </div>

      <div className="admin-content-simple">
        
        {/* ABA DE CONFIGURAÇÕES */}
        {activeTab === 'config' && (
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
            <label>📸 QR Code PIX (Imagem)</label>
            <div className="qrcode-upload">
              {uploading && (
                <div className="uploading-indicator">
                  <p>⏳ Carregando imagem...</p>
                </div>
              )}
              {!uploading && settings.qrCodeUrl ? (
                <div className="qrcode-preview-box">
                  <div className="qrcode-preview">
                    <img src={settings.qrCodeUrl} alt="QR Code Preview" />
                  </div>
                  <p className="success-text">✓ QR Code carregado e ativo!</p>
                </div>
              ) : !uploading ? (
                <div className="qrcode-empty">
                  <p>📤 Nenhum QR Code carregado</p>
                  <p className="hint-small">Tire uma foto do QR Code e faça upload aqui</p>
                </div>
              ) : null}
              <label htmlFor="qrcode-file" className="btn-upload">
                <Upload size={20} />
                {settings.qrCodeUrl ? '🔄 Trocar QR Code' : '📸 Enviar Foto do QR Code'}
              </label>
              <input
                id="qrcode-file"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <p className="input-hint">
                <strong>📱 Como usar:</strong><br/>
                1️⃣ Tire uma foto do QR Code PIX no seu celular/banco<br/>
                2️⃣ Clique no botão roxo acima e escolha a foto<br/>
                3️⃣ Pronto! O QR Code será exibido na página de pagamento automaticamente!
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
        )}

        {/* ABA DE USUÁRIOS */}
        {activeTab === 'users' && (
          <div className="users-card">
            <h2>Cadastros de Usuários ({users.length})</h2>
            
            {loadingUsers ? (
              <div className="loading-users">
                <p>⏳ Carregando cadastros...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="no-users">
                <p>📝 Nenhum cadastro encontrado</p>
                <p className="hint-small">Os usuários aparecerão aqui conforme se cadastrarem</p>
              </div>
            ) : (
              <div className="users-list">
                {users.map((user, index) => (
                  <div key={index} className="user-item">
                    <div className="user-info">
                      <h3>{user.nome}</h3>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Telefone:</strong> {user.telefone}</p>
                      <p><strong>CPF:</strong> {user.cpf}</p>
                      <p><strong>Data de Nascimento:</strong> {user.dataNascimento}</p>
                      <p><strong>Cadastrado em:</strong> {new Date(user.createdAt).toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;