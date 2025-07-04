import React from 'react';
import '../styles/SuccessMessage.css';
import successTick from '../assets/success_tick.svg'; 

const SuccessMessage = ({ companyName, phoneNumber, onClose }) => {
  const formattedDateTime = new Date().toLocaleString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="success-overlay">
      <div className="success-modal">
        <img src={successTick} alt="Success Tick" className="success-tick" />
        <h2>Account created successfully!</h2>
        <p className="timestamp">{formattedDateTime.replace(',', ' |')}</p>

        <div className="highlight-box">
          <p><strong>Company:</strong> {companyName}</p>
          <p><strong>Phone:</strong> {phoneNumber}</p>
        </div>

        <button className="back-home-btn" onClick={onClose}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
