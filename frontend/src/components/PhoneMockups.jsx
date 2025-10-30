import React from 'react';
import './Components.css';

const PhoneMockups = () => {
  return (
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
  );
};

export default PhoneMockups;