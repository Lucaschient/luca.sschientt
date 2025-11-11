import React from 'react';
import './Components.css';
import { Apple } from 'lucide-react';

const DownloadButtons = () => {
  return (
    <div className="download-buttons">
      <button className="download-btn">
        <Apple className="btn-icon" size={20} />
        <span>baixar na app store</span>
      </button>
      <button className="download-btn">
        <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 20.4L20.3 12L3 3.6L3 10.5L14.3 12L3 13.5L3 20.4Z" fill="currentColor"/>
        </svg>
        <span>baixar na google play</span>
      </button>
    </div>
  );
};

export default DownloadButtons;