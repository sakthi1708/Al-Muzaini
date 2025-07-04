import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CorporateDetails.css';
import Logo from '../assets/logo.svg';
import greenTick from '../assets/green_tick.svg';
import greyBox from '../assets/grey_box.svg';
import stepTrail from '../assets/stepTrail.svg';
import SuccessMessage from './SuccessMessage';

const CorporateDetails = () => {
  const navigate = useNavigate();

  const [sameAsRegistered, setSameAsRegistered] = useState(false);
  const [registeredAddress1, setRegisteredAddress1] = useState('');
  const [registeredAddress2, setRegisteredAddress2] = useState('');
  const [communicationAddress1, setCommunicationAddress1] = useState('');
  const [communicationAddress2, setCommunicationAddress2] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) return;

    const timer = setTimeout(() => {
      setFormErrors({});
    }, 5000);

    return () => clearTimeout(timer);
  }, [formErrors]);
  
  const fields = [
    { key: 'typeOfCompany', label: 'Type of Company' },
    { key: 'companyName', label: 'Company Name', setter: setCompanyName },
    { key: 'middleName', label: 'Middle Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'employees', label: 'No Of Employees', type: 'number' },
    { key: 'category', label: 'Company Category' },
    { key: 'business', label: 'Type of Business' },
    { key: 'manager', label: 'Account Manager' },
    { key: 'paidUpCapital', label: 'Paid Up Capital' },
    { key: 'workingCapital', label: 'Working Capital' },
    { key: 'nationality', label: 'Nationality' },
  ];

  const handleChange = (key, value, setter) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: '' }));
    if (setter) setter(value);
  };

  const handleCheckbox = () => {
    const newState = !sameAsRegistered;
    setSameAsRegistered(newState);

    if (newState) {
      setCommunicationAddress1(registeredAddress1);
      setCommunicationAddress2(registeredAddress2);
    } else {
      setCommunicationAddress1('');
      setCommunicationAddress2('');
    }
  };

  const validate = () => {
    const errors = {};
    fields.forEach(({ key, label }) => {
      if (!formData[key]?.trim()) errors[key] = `${label} is required`;
    });
    if (!registeredAddress1.trim()) errors.registeredAddress1 = 'Registered Address 1 is required';
    if (!communicationAddress1.trim()) errors.communicationAddress1 = 'Communication Address 1 is required';
    if (!contactNumber.match(/^\d{7,15}$/)) errors.contactNumber = 'Contact Number must be 7–15 digits';
    if (!phoneNumber.match(/^\d{7,15}$/)) errors.phoneNumber = 'Phone Number must be 7–15 digits';
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.email = 'Invalid Email format';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setShowSuccess(true);
  };

  return (
    <div className="corporate-container">
      <div className="corporate-card">
        <img src={Logo} alt="Logo" className="corporate-logo" />

        <div className="stepper">
          {['Corporate Details', 'Additional Details', 'Corporate ID Details', 'Representative Details', 'Document Details'].map((label, idx) => (
            <React.Fragment key={idx}>
              <div className="step">
                <img src={idx === 0 ? greenTick : greyBox} alt="Step Icon" className="step-icon" />
                <span>{label}</span>
              </div>
              {idx < 4 && <img src={stepTrail} alt="Trail" className="step-trail" />}
            </React.Fragment>
          ))}
        </div>

        <h2 className="form-heading">Corporate Details</h2>

        <form className="corporate-form" onSubmit={handleSubmit}>
          <div className="grid-container">
            {fields.map(({ key, label, type = 'text', setter }) => (
              <div className="input-field" key={key}>
                <label>
                  {label} <span className="required-star">*</span>
                </label>
                <input
                  type={type}
                  value={formData[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value, setter)}
                />
                {formErrors[key] && <div className="field-error2">{formErrors[key]}</div>}
              </div>
            ))}

            <div className="input-field">
              <label>Registered Address 1 <span className="required-star">*</span></label>
              <input
                type="text"
                value={registeredAddress1}
                onChange={(e) => {
                  const value = e.target.value;
                  setRegisteredAddress1(value);
                  if (sameAsRegistered) setCommunicationAddress1(value);
                }}
              />
              {formErrors.registeredAddress1 && <div className="field-error2">{formErrors.registeredAddress1}</div>}
            </div>

            <div className="input-field">
              <label>Registered Address 2</label>
              <input
                type="text"
                value={registeredAddress2}
                onChange={(e) => {
                  const value = e.target.value;
                  setRegisteredAddress2(value);
                  if (sameAsRegistered) setCommunicationAddress2(value);
                }}
              />
            </div>

            <div className="input-field">
              <label>Communication Address</label>
              <label className="checkbox-row">
                <input type="checkbox" checked={sameAsRegistered} onChange={handleCheckbox} />
                <span className="checkbox-span">Same as Registered Address</span>
              </label>
            </div>

            <div className="input-field">
              <label>Communication Address 1 <span className="required-star">*</span></label>
              <input
                type="text"
                value={communicationAddress1}
                onChange={(e) => !sameAsRegistered && setCommunicationAddress1(e.target.value)}
                readOnly={sameAsRegistered}
              />
              {formErrors.communicationAddress1 && <div className="field-error2">{formErrors.communicationAddress1}</div>}
            </div>

            <div className="input-field">
              <label>Communication Address 2</label>
              <input
                type="text"
                value={communicationAddress2}
                onChange={(e) => !sameAsRegistered && setCommunicationAddress2(e.target.value)}
                readOnly={sameAsRegistered}
              />
            </div>

            <div className="input-field phone-row">
              <label>Contact Number <span className="required-star">*</span></label>
              <div className="phone-input-group">
                <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
              {formErrors.contactNumber && <div className="field-error2">{formErrors.contactNumber}</div>}
            </div>

            <div className="input-field phone-row">
              <label>Phone Number <span className="required-star">*</span></label>
              <div className="phone-input-group">
                <select>
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              {formErrors.phoneNumber && <div className="field-error2">{formErrors.phoneNumber}</div>}
            </div>

            <div className="input-field email-row">
              <label>Email Address <span className="required-star">*</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formErrors.email && <div className="field-error2">{formErrors.email}</div>}
            </div>
          </div>

          <button type="submit" className="signup-button">Continue</button>
        </form>

        {showSuccess && (
          <SuccessMessage
            companyName={companyName}
            phoneNumber={`${countryCode} ${contactNumber}`}
            onClose={() => navigate('/')}
          />
        )}
      </div>
    </div>
  );
};

export default CorporateDetails;
