import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './paymentConfirmation.css';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedOption } = location.state || {};

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="payment-confirmation">
      <h2>Payment Successful</h2>
      <p>Your payment via {selectedOption} was successful!</p>
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default PaymentConfirmation;
