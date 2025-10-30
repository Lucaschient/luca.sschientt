import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Step1Welcome from '../components/Step1Welcome';
import Step2Form from '../components/Step2Form';
import Step2_5EmailVerification from '../components/Step2_5EmailVerification';
import Step3AlmostThere from '../components/Step3AlmostThere';
import Step4Taxa from '../components/Step4Taxa';
import Step5Payment from '../components/Step5Payment';
import Step6BankData from '../components/Step6BankData';
import Step7Finalized from '../components/Step7Finalized';

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    bankData: {
      accountHolder: '',
      agency: '',
      accountType: '',
      accountNumber: '',
      bank: ''
    }
  });

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <Step1Welcome onNext={nextStep} />;
      case 2:
        return <Step2Form onNext={nextStep} formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step2_5EmailVerification onNext={nextStep} formData={formData} />;
      case 4:
        return <Step3AlmostThere onNext={nextStep} />;
      case 5:
        return <Step4Taxa onNext={nextStep} />;
      case 6:
        return <Step5Payment onNext={nextStep} />;
      case 7:
        return <Step6BankData onNext={nextStep} formData={formData} updateFormData={updateFormData} />;
      case 8:
        return <Step7Finalized />;
      default:
        return <Step1Welcome onNext={nextStep} />;
    }
  };

  return (
    <div className="homepage-container">
      {renderStep()}
    </div>
  );
};

export default HomePage;