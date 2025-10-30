import React from 'react';
import './Steps.css';
import OLXLogo from './OLXLogo';
import PhoneMockups from './PhoneMockups';
import DownloadButtons from './DownloadButtons';
import Footer from './Footer';

const Step1Welcome = ({ onNext }) => {
  return (
    <div className="step-container">
      <OLXLogo />
      
      <div className="step-content">
        <h1 className="step-title purple-title">Olá, Seja Bem-vindo(a)!</h1>
        <p className="step-description">
          Você está na central de vendas aprovadas em nosso sistema. Clique em "Avançar" e saiba mais.
        </p>
        <button className="btn-primary" onClick={onNext}>
          Avançar
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

export default Step1Welcome;