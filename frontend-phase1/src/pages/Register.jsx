import React, { useState } from 'react';
import { useStateContext } from '../context';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [type, setType] = useState('');
  const { registerUser } = useStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(walletAddress, type);
  };

  return (
    <div className="registration-form-container">
      <h2 className="registration-form-heading">User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="walletAddress" className="form-label">Wallet Address:</label>
          <input
            type="text"
            id="walletAddress"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type" className="form-label">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-select"
          >
            <option value="">Select Type</option>
            <option value="Artist">Artist</option>
            <option value="Verifier">Verifier</option>
          </select>
        </div>
        <button type="submit" className="form-submit-btn">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
