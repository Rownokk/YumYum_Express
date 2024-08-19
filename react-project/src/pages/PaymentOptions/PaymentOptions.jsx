import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './paymentOptions.css';

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const proceedToPayment = () => {
    if (selectedOption) {
      // Navigate to the payment confirmation page
      navigate('/payment-confirmation', { state: { selectedOption } });
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div className="payment-options">
      <h2>Select Payment Method</h2>
      <div className="payment-methods">
        <label>
          <input
            type="radio"
            value="bkash"
            checked={selectedOption === 'bkash'}
            onChange={handleOptionChange}
          />
          bKash
        </label>
        <label>
          <input
            type="radio"
            value="paypal"
            checked={selectedOption === 'paypal'}
            onChange={handleOptionChange}
          />
          PayPal
        </label>
        <label>
          <input
            type="radio"
            value="cod"
            checked={selectedOption === 'cod'}
            onChange={handleOptionChange}
          />
          Cash on Delivery
        </label>
      </div>
      <button onClick={proceedToPayment}>Proceed</button>
    </div>
  );
};

export default PaymentOptions;
