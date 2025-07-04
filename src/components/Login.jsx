import React, { useState } from 'react';
import '../styles/Login.css';
import logo from '../assets/logo.svg';
import map from '../assets/map.svg';
import rateCalculatorIcon from '../assets/rc.svg';
import branchesIcon from '../assets/branches.svg';
import supportIcon from '../assets/support.svg';
import englishIcon from '../assets/translate.svg';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();

    // Reset messages
    setUsernameError('');
    setPasswordError('');
    setLoginMessage('');

    // Check if both fields are empty
    if (!username && !password) {
      setUsernameError('Need to fill the fields');
      setPasswordError('Need to fill the fields');
      return;
    }

    // Check individual fields
    if (!username) {
      setUsernameError('Username is required.');
      return;
    }

    if (!password) {
      setPasswordError('Password is required.');
      return;
    }

    // Check credentials
    if (username === 'admin' && password === 'admin123') {
      setLoginMessage('Login successful!');
    } else {
      setLoginMessage('Invalid credentials. Please sign up.');
    }
  };


  return (
    <div className="login-container">
      <div className="left-section">
        <img src={logo} alt="Al-Muzaini Exchange Logo" className="logo" />
        <img src={map} alt="Map" className="map-placeholder" />
        <p className="slogan">Always Near You - Since 1942</p>
        <p className="description">
          Transfer money safely and conveniently with the number one exchange company in Kuwait.
        </p>
        <div className="links">
          <a href="#"><img src={rateCalculatorIcon} alt="Rate Calculator Icon" className="link-icon" /><span className="link-text">Rate Calculator</span></a>
          <a href="#"><img src={branchesIcon} alt="Branches Icon" className="link-icon" /><span className="link-text">Branches</span></a>
          <a href="#"><img src={supportIcon} alt="Support Icon" className="link-icon" /><span className="link-text">Support</span></a>
        </div>
      </div>

      <div className="right-section">
        <div className="language-toggle">
          <img src={englishIcon} alt="English" className="language-icon" />
        </div>
        <h2 className="temp">Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className={`field-error ${usernameError ? 'visible' : ''}`}>
              {usernameError}
            </div>          
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              <div className={`field-error ${passwordError ? 'visible' : ''}`}>
                {passwordError}
              </div>
          </div>

          <div className="forgot-links">
            <a href="#">Forgot username?</a>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Login</button>
          <div className={`message ${loginMessage ? 'visible' : ''} ${loginMessage.includes('successful') ? 'success' : 'error'}`}>
            {loginMessage}
          </div>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
