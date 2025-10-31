import React, { useState, useEffect } from 'react';
import './Steps.css';
import OLXLogo from './OLXLogo';
import PhoneMockups from './PhoneMockups';
import DownloadButtons from './DownloadButtons';
import { Copy, Check } from 'lucide-react';

const Step5Payment = ({ onNext }) => {
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // SEMPRE carregar do localStorage primeiro (valores do admin)
    const savedSettings = localStorage.getItem('adminSettings');
    
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        console.log('✅ Configurações carregadas do Admin:', parsed);
      } catch (e) {
        console.error('Erro ao carregar configurações:', e);
        // Usar valores padrão apenas se houver erro
        setSettings({
          pixKey: '(11) 98668-9035',
          qrCodeUrl: 'https://customer-assets.emergentagent.com/job_vendas-pay/artifacts/jvnivn9w_IMG-20251030-WA0000.jpg',
          taxaValue: 'Taxa Caução R$ 99,00'
        });
      }
    } else {
      // Valores padrão apenas na primeira vez
      const defaultSettings = {
        pixKey: '(11) 98668-9035',
        qrCodeUrl: 'https://customer-assets.emergentagent.com/job_vendas-pay/artifacts/jvnivn9w_IMG-20251030-WA0000.jpg',
        taxaValue: 'Taxa Caução R$ 99,00'
      };
      setSettings(defaultSettings);
      // Salvar os valores padrão para o admin também ter acesso
      localStorage.setItem('adminSettings', JSON.stringify(defaultSettings));
    }
  }, []);

  const handleCopy = () => {
    if (settings && settings.pixKey) {
      navigator.clipboard.writeText(settings.pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Mostrar loading enquanto carrega
  if (!settings) {
    return (
      <div className="step-container">
        <OLXLogo />
        <div className="step-content">
          <h1 className="step-title purple-title">Carregando...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="step-container">
      <OLXLogo />
      
      <div className="step-content">
        <h1 className="step-title purple-title">Confirmação de Pagamento</h1>
        <p className="step-description">
          Após confirmar, em instantes você receberá o valor em conta!
        </p>
        
        <h2 className="taxa-value">{settings.taxaValue}</h2>
        
        <div className="qrcode-container">
          <img src={settings.qrCodeUrl} alt="QR Code PIX" className="qrcode-image" />
        </div>
        
        <p className="pix-instruction">Use o Pix copia e cola abaixo:</p>
        
        <div className="pix-key-container">
          <input
            type="text"
            value={settings.pixKey}
            readOnly
            className="pix-key-input"
          />
          <button className="btn-copy" onClick={handleCopy}>
            {copied ? <Check size={20} /> : <Copy size={20} />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
        
        <button className="btn-primary" onClick={onNext}>
          Já Paguei!
        </button>
      </div>

      <div className="app-download-section">
        <h2 className="app-download-title">
          <span className="purple-bold">baixe o OLX app</span> e comece a vender com desconto
        </h2>
        <PhoneMockups />
        <DownloadButtons />
      </div>
    </div>
  );
};

export default Step5Payment;