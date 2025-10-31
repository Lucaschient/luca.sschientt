import React, { useState, useEffect } from 'react';
import './Steps.css';
import OLXLogo from './OLXLogo';
import PhoneMockups from './PhoneMockups';
import DownloadButtons from './DownloadButtons';
import Footer from './Footer';

const Step7Finalized = () => {
  const [whatsappLink, setWhatsappLink] = useState('https://wa.me/554796716712');

  useEffect(() => {
    // Load WhatsApp link from localStorage (admin panel)
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      if (parsed.whatsappLink) {
        setWhatsappLink(parsed.whatsappLink);
      }
    }
  }, []);

  const handleSendReceipt = () => {
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="step-container">
      <OLXLogo />
      
      <div className="step-content">
        <h1 className="step-title purple-title">Foi finalizada a negociação positivamente</h1>
        <p className="step-description">
          Parabéns! Todas as etapas necessárias para o recebimento do valor da sua venda foram concluídas com sucesso. Agora, estamos analisando os detalhes do pagamento da taxa.
        </p>
        <p className="step-description step-attention">
          <strong>Atenção!</strong> Em breve você receberá uma confirmação por email, SMS ou ligação informando que o valor foi creditado em sua conta. Aguarde dentro de minutos você será notificado! A OLX Agradece.
        </p>
        <button className="btn-primary" onClick={handleSendReceipt}>
          Enviar Comprovante
        </button>
      </div>

      <div className="app-download-section">
        <h2 className="app-download-title">
          <span className="purple-bold">baixe o OLX app</span> e comece a vender com desconto
        </h2>
        <PhoneMockups />
        <DownloadButtons />
      </div>

      <Footer />
    </div>
  );
};

export default Step7Finalized;