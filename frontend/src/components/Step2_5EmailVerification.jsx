import React, { useState, useEffect } from 'react';
import './Steps.css';
import OLXLogo from './OLXLogo';
import PhoneMockups from './PhoneMockups';
import DownloadButtons from './DownloadButtons';
import Footer from './Footer';
import { Mail, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Step2_5EmailVerification = ({ onNext, formData }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState('');

  useEffect(() => {
    // Send real email via API
    const sendEmail = async () => {
      try {
        setSending(true);
        const response = await axios.post(`${API}/send-verification-email`, {
          email: formData.email,
          name: formData.name
        });
        
        if (response.data.success) {
          setEmailSent(true);
          setSending(false);
        } else {
          setError(response.data.message || 'Erro ao enviar e-mail');
          setSending(false);
        }
      } catch (err) {
        console.error('Error sending email:', err);
        setError('Erro ao enviar e-mail. Tente novamente.');
        setSending(false);
      }
    };
    
    sendEmail();
  }, [formData.email, formData.name]);

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

  const handleResend = async () => {
    setEmailSent(false);
    setSending(true);
    setError('');
    setCountdown(5);
    
    try {
      const response = await axios.post(`${API}/send-verification-email`, {
        email: formData.email,
        name: formData.name
      });
      
      if (response.data.success) {
        setEmailSent(true);
        setSending(false);
      } else {
        setError(response.data.message || 'Erro ao enviar e-mail');
        setSending(false);
      }
    } catch (err) {
      setError('Erro ao enviar e-mail. Tente novamente.');
      setSending(false);
    }
  };

  return (
    <div className="step-container">
      <OLXLogo />
      
      <div className="step-content">
        {sending ? (
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
        ) : error ? (
          <>
            <h1 className="step-title" style={{color: '#dc3545'}}>Erro ao enviar e-mail</h1>
            <p className="step-description">{error}</p>
            <button className="btn-primary" onClick={handleResend}>
              Tentar Novamente
            </button>
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
              Por favor, verifique sua caixa de entrada (e pasta de spam) e clique no link de confirmação.
              Após confirmar, clique no botão abaixo para continuar.
            </p>
            
            <div className="email-tip">
              <p><strong>Dica:</strong> O e-mail chegará em poucos segundos. Verifique também a pasta de spam!</p>
            </div>

            <button 
              className="btn-primary" 
              onClick={handleContinue}
              disabled={countdown > 0}
              style={{ opacity: countdown > 0 ? 0.6 : 1 }}
            >
              {countdown > 0 ? `Aguarde ${countdown}s...` : 'Já Confirmei Meu E-mail'}
            </button>

            <p className="resend-link">
              Não recebeu o e-mail? <span className="link-style" onClick={handleResend}>Reenviar</span>
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
