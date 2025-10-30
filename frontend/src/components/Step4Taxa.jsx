import React from 'react';
import './Steps.css';
import OLXLogo from './OLXLogo';
import PhoneMockups from './PhoneMockups';
import DownloadButtons from './DownloadButtons';
import { Gem } from 'lucide-react';

const Step4Taxa = ({ onNext }) => {
  return (
    <div className="step-container">
      <OLXLogo />
      
      <div className="step-content">
        <h1 className="step-title purple-title">Importante</h1>
        <p className="step-description">
          Parabéns pela sua venda! Notamos que você ainda não possui histórico de pontuação como vendedor.
        </p>
        <p className="step-description">
          Para garantir a legitimidade dos anúncios, será necessário o pagamento de uma tarifa de liberação, inteiramente reembolsada com o valor da venda.
        </p>
        
        <div className="taxa-icon">
          <Gem size={48} className="gem-icon" />
        </div>
        
        <h2 className="taxa-title">Taxa Caução</h2>
        
        <button className="btn-primary" onClick={onNext}>
          Pagar
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

export default Step4Taxa;