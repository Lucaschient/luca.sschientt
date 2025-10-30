import React from 'react';
import './Steps.css';
import OLXLogo from './OLXLogo';
import PhoneMockups from './PhoneMockups';
import DownloadButtons from './DownloadButtons';
import Footer from './Footer';

const Step3AlmostThere = ({ onNext }) => {
  return (
    <div className="step-container">
      <OLXLogo />
      
      <div className="step-content">
        <h1 className="step-title purple-title">Estamos quase lá!</h1>
        <p className="step-description">
          Falta pouco para receber os valores de suas vendas. Clique em "Avançar" para fornecer as informações do valor de sua venda.
        </p>
        <p className="step-description step-highlight">
          Aproveite seus ganhos e continue vendendo com sucesso!
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

export default Step3AlmostThere;