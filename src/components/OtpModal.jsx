import React, { useEffect, useRef } from 'react';
import '../styles/OtpModal.css';
import cancelIcon from '../assets/cancel.svg';
import otpIcon from '../assets/OtpIcon.svg';

const OtpModal = ({ mobileNumber, otp, setOtp, onVerify, onClose, otpError }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === 'Backspace') {
      if (otp[index]) {
        const updatedOtp = [...otp];
        updatedOtp[index] = '';
        setOtp(updatedOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = '';
        setOtp(updatedOtp);
        e.preventDefault();
      }
    }

    if (key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {/* Header line */}
        <div className="modal-header">
          <span className="modal-title">OTP Verification</span>
          <img
            src={cancelIcon}
            alt="Close"
            className="modal-close-icon"
            onClick={onClose}
          />
        </div>

        {/* Center Icon */}
        <img src={otpIcon} alt="OTP Icon" className="modal-otp-icon" />
        <p className="modal-title">OTP Verification</p>
        <p className="otp-instruction">
          Enter the OTP sent to <strong>{mobileNumber}</strong>
        </p>

        {/* 4 Digit Input */}
        <div className="otp-input-container">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              value={otp[index] || ''}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otp-box"
            />
          ))}
        </div>

        <p className="resend-text">
          Didn't receive the OTP? <span className="resend-link">Resend</span>
        </p>

        <button className="signup-button" onClick={onVerify}>Verify</button>
        <div style={{ height: '20px', marginTop: '8px' }}>
          {otpError && (
            <p style={{ color: 'red', margin: 0, fontSize: '13px' }}>{otpError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
