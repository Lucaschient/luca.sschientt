import React, { useState } from 'react';
import './HomePage.css';
import { Apple, PlayCircle } from 'lucide-react';

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="homepage">
      {/* Header with Logo */}
      <header className="header">
        <div className="olx-logo">
          <span className="logo-o">O</span>
          <span className="logo-l">L</span>
          <span className="logo-x">X</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Olá, Seja Bem-vindo(a)!</h1>
          <p className="hero-subtitle">
            Você está na central de vendas aprovadas em nosso sistema. Clique em "Avançar" e saiba mais.
          </p>
          <button 
            className="cta-button"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Avançar
          </button>
        </div>
      </section>

      {/* App Download Section */}
      <section className="app-section">
        <h2 className="app-title">
          <span className="app-title-download">baixe</span>{' '}
          <span className="app-title-olx">o OLX app</span>{' '}
          <span className="app-title-sell">e comece a vender com desconto</span>
        </h2>

        {/* Phone Mockups */}
        <div className="phone-mockups">
          <div className="phone phone-left">
            <div className="phone-screen">
              <div className="screen-content screen-left"></div>
            </div>
          </div>
          <div className="phone phone-center">
            <div className="phone-screen phone-screen-center">
              <div className="screen-content screen-center">
                <div className="center-logo">
                  <span className="logo-o">O</span>
                  <span className="logo-l">L</span>
                  <span className="logo-x">X</span>
                </div>
              </div>
            </div>
          </div>
          <div className="phone phone-right">
            <div className="phone-screen">
              <div className="screen-content screen-right"></div>
            </div>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="download-buttons">
          <button className="download-btn app-store-btn">
            <Apple className="btn-icon" size={20} />
            <span>baixar na app store</span>
          </button>
          <button className="download-btn google-play-btn">
            <PlayCircle className="btn-icon" size={20} />
            <span>baixar na google play</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="olx-logo-footer">
          <span className="logo-o">O</span>
          <span className="logo-l">L</span>
          <span className="logo-x">X</span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;