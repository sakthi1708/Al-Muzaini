import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'; 
import Logo from '../assets/logo.svg'; 
import licenseIcon from '../assets/trade_license_number.svg';
import phoneIcon from '../assets/call.svg';
import OtpModal from './OtpModal';


const SignUp = () => {
  const navigate = useNavigate();

    const [tradeNumber, setTradeNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [otpError, setOtpError] = useState('');
    const [licenseError, setLicenseError] = useState('');
    const [mobileError, setMobileError] = useState('');


    useEffect(() => {
    if (!otpError) return;
    const timer = setTimeout(() => setOtpError(''), 5000);
    return () => clearTimeout(timer);
    }, [otpError]);
    useEffect(() => {
      if (!licenseError) return;
      const timer = setTimeout(() => setLicenseError(''), 5000);
      return () => clearTimeout(timer);
    }, [licenseError]);

    useEffect(() => {
      if (!mobileError) return;
      const timer = setTimeout(() => setMobileError(''), 5000);
      return () => clearTimeout(timer);
    }, [mobileError]);

const handleContinue = (e) => {
  e.preventDefault();

  const licenseRegex = /^\d{12}$/;
  const mobileRegex = /^\+\d{2,3} \d{10}$/;

  setLicenseError('');
  setMobileError('');

  let valid = true;

  if (!tradeNumber.trim()) {
    setLicenseError('Enter Trade Liscense Number');
    valid = false;
  } else if (!licenseRegex.test(tradeNumber)) {
    setLicenseError('Trade License Number must be exactly 12 digits.');
    valid = false;
  }

  if (!mobileNumber.trim()) {
    setMobileError('Enter Number Correctly');
    valid = false;
  } else if (!mobileRegex.test(mobileNumber)) {
    setMobileError('Mobile number must be in format: +91 9876543210');
    valid = false;
  }
console.log({ licenseError, mobileError });

  if (!valid) return;

  setShowOtpModal(true);
};


  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <img src={Logo} alt="Verify Account" className="signup-image" />
        <h2 className="signup-title">Verify Your Account</h2>
        <p className="signup-description">
          Please Enter Your Data To Verify Your Account
        </p>
        <form onSubmit={handleContinue}>
        <div className="signup-input-group">
        <div className="signup-input-wrapper">
            <img src={licenseIcon} alt="License Icon" className="signup-icon" />
            <input
            type="text"
            placeholder="Trade License Number"
            value={tradeNumber}
            onChange={(e) => setTradeNumber(e.target.value)}
            className="signup-input"
            />
        </div>
          <div className="field-error1" style={{ minHeight: '16px' }}>
            {licenseError}
          </div>
        </div>
        <div className="signup-input-group">
        <div className="signup-input-wrapper">
            <img src={phoneIcon} alt="Phone Icon" className="signup-icon" />
            <input
            type="text"
            placeholder="Mobile Number /   +99 1234567890"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="signup-input"
            />
        </div>
          <div className="field-error1" style={{ minHeight: '16px' }}>
            {mobileError}
          </div>
        </div>
          <button type="submit" className="signup-button">Continue</button>
        </form>
        {showOtpModal && (
            <OtpModal
            mobileNumber={mobileNumber}
            otp={otp}
            setOtp={setOtp}
            onVerify={() => {
                if (otp.join('') === '1234') {
                setOtpError('');
                setShowOtpModal(false);
                navigate('/corporate');
                } else {
                setOtpError('Invalid OTP');
                }
            }}
            onClose={() => setShowOtpModal(false)}
            otpError={otpError}
            />
            )}
      </div>
    </div>
  );
};

export default SignUp;
