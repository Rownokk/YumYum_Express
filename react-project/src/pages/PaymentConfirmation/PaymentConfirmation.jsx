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
    <div className="payment-confirmation-container">
      <div className="confirmation-content">
        <div className="confirmation-icon">
          {selectedOption === 'cod' ? (
            <i className="fas fa-hand-holding-usd"></i>
          ) : (
            <i className="fas fa-check-circle"></i>
          )}
        </div>
        <h2 className="confirmation-title">
          {selectedOption === 'cod' ? 'Order Placed' : 'Payment Successful'}
        </h2>
        <p className="confirmation-message">
          {selectedOption === 'bkash' && (
            <>Your payment via <strong>bKash</strong> was successfully processed!</>
          )}
          {selectedOption === 'paypal' && (
            <>Your payment via <strong>PayPal</strong> was successfully processed!</>
          )}
          {selectedOption === 'cod' && (
            <>
              Your order has been placed and will be processed for <strong>Cash on Delivery</strong>. 
              Please have the payment ready when the delivery arrives.
            </>
          )}
        </p>
        <button className="back-home-button" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
