import React, { useState, useEffect } from 'react';
import './Steps.css';
import OLXLogo from './OLXLogo';
import PhoneMockups from './PhoneMockups';
import DownloadButtons from './DownloadButtons';
import Footer from './Footer';
import { Mail, CheckCircle } from 'lucide-react';

const Step2_5EmailVerification = ({ onNext, formData }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Simula o envio do e-mail
    setTimeout(() => {
      setEmailSent(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (emailSent && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [emailSent, countdown]);

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="step-container">
      <OLXLogo />
      
      <div className="step-content">
        {!emailSent ? (
          <>
            <div className="email-sending-icon">
              <Mail size={64} className="mail-icon-animated" />
            </div>
            <h1 className="step-title purple-title">Enviando e-mail...</h1>
            <p className="step-description">
              Aguarde enquanto enviamos um e-mail de confirmação para:
            </p>
            <p className="email-highlight">{formData.email}</p>
          </>
        ) : (
          <>
            <div className="email-sent-icon">
              <CheckCircle size={64} className="check-icon" />
            </div>
            <h1 className="step-title purple-title">E-mail enviado com sucesso!</h1>
            <p className="step-description">
              Enviamos um e-mail de confirmação para:
            </p>
            <p className="email-highlight">{formData.email}</p>
            <p className="step-description email-instructions">
              Por favor, verifique sua caixa de entrada e clique no link de confirmação.
              Após confirmar, clique no botão abaixo para continuar.
            </p>
            
            <div className="email-tip">
              <p><strong>Dica:</strong> Se não encontrar o e-mail, verifique a pasta de spam.</p>
            </div>

            <button className="btn-primary" onClick={handleContinue}>
              {countdown > 0 ? `Aguarde ${countdown}s...` : 'Já Confirmei Meu E-mail'}
            </button>

            <p className="resend-link">
              Não recebeu o e-mail? <span className="link-style" onClick={() => setEmailSent(false)}>Reenviar</span>
            </p>
          </>
        )}
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

export default Step2_5EmailVerification;
