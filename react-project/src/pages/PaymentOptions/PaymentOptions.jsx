import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './paymentOptions.css';

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [step, setStep] = useState('select'); // Track the current step
  const [isProcessing, setIsProcessing] = useState(false); // Track if payment is being processed
  const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', cvv: '' });
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCardInfoChange = (event) => {
    const { name, value } = event.target;
    setCardInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const proceedToPayment = () => {
    if (selectedOption) {
      setStep('payment');
    } else {
      alert('Please select a payment method.');
    }
  };

  const handleCardFormSubmit = (event) => {
    event.preventDefault();
    simulatePaymentProcess();
  };

  const goBack = () => {
    if (isProcessing) {
      alert('Payment is currently processing. Please wait.');
      return;
    }
    setStep('select');
    setSelectedOption('');
    setCardInfo({ number: '', expiry: '', cvv: '' });
  };

  const simulatePaymentProcess = () => {
    setIsProcessing(true);

    // Simulate a delay for payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // After processing, navigate to payment confirmation
      navigate('/payment-confirmation', { state: { selectedOption } });
    }, 3000); // 3-second delay for realism
  };

  useEffect(() => {
    // Ensure that if the component unmounts or user navigates away,
    // the payment process is not mistakenly triggered.
    return () => {
      setIsProcessing(false);
    };
  }, []);

  return (
    <div className="payment-options-container">
      {step === 'select' && (
        <>
          <h2 className="payment-title">Choose Your Payment Method</h2>
          <div className="payment-methods">
            <label className={`payment-option ${selectedOption === 'credit-card' ? 'selected' : ''}`}>
              <input
                type="radio"
                value="credit-card"
                checked={selectedOption === 'credit-card'}
                onChange={handleOptionChange}
              />
              <span className="payment-label">Credit Card</span>
            </label>
            <label className={`payment-option ${selectedOption === 'paypal' ? 'selected' : ''}`}>
              <input
                type="radio"
                value="paypal"
                checked={selectedOption === 'paypal'}
                onChange={handleOptionChange}
              />
              <span className="payment-label">PayPal</span>
            </label>
            <label className={`payment-option ${selectedOption === 'cod' ? 'selected' : ''}`}>
              <input
                type="radio"
                value="cod"
                checked={selectedOption === 'cod'}
                onChange={handleOptionChange}
              />
              <span className="payment-label">Cash on Delivery</span>
            </label>
          </div>
          <button className="proceed-button" onClick={proceedToPayment}>
            Proceed
          </button>
        </>
      )}

      {step === 'payment' && (
        <div className="dummy-payment-page">
          <button className="back-button" onClick={goBack}>
            &larr; Back
          </button>
          {isProcessing ? (
            <div className="payment-processing">
              <p>Processing your payment...</p>
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {selectedOption === 'credit-card' && (
                <div className="card-payment-form">
                  <h2>Credit Card Payment</h2>
                  <p>Please enter your card details:</p>
                  <form onSubmit={handleCardFormSubmit}>
                    <label>
                      Card Number:
                      <input
                        type="text"
                        name="number"
                        value={cardInfo.number}
                        onChange={handleCardInfoChange}
                        required
                      />
                    </label>
                    <label>
                      Expiry Date:
                      <input
                        type="text"
                        name="expiry"
                        value={cardInfo.expiry}
                        onChange={handleCardInfoChange}
                        required
                      />
                    </label>
                    <label>
                      CVV:
                      <input
                        type="text"
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={handleCardInfoChange}
                        required
                      />
                    </label>
                    <button type="submit" className="submit-button">Submit Payment</button>
                  </form>
                </div>
              )}
              {selectedOption === 'paypal' && (
                <div className="card-payment-form">
                  <h2>PayPal Payment</h2>
                  <p>Please enter your payment details:</p>
                  <form onSubmit={handleCardFormSubmit}>
                    <label>
                      PayPal Email:
                      <input
                        type="email"
                        name="email"
                        placeholder="youremail@example.com"
                        required
                      />
                    </label>
                    <label>
                      Card Number:
                      <input
                        type="text"
                        name="number"
                        value={cardInfo.number}
                        onChange={handleCardInfoChange}
                        required
                      />
                    </label>
                    <label>
                      Expiry Date:
                      <input
                        type="text"
                        name="expiry"
                        value={cardInfo.expiry}
                        onChange={handleCardInfoChange}
                        required
                      />
                    </label>
                    <label>
                      CVV:
                      <input
                        type="text"
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={handleCardInfoChange}
                        required
                      />
                    </label>
                    <button type="submit" className="submit-button">Submit Payment</button>
                  </form>
                </div>
              )}
              {selectedOption === 'cod' && (
                <>
                  <h2>Cash on Delivery</h2>
                  <p>Your order will be processed for Cash on Delivery. Prepare payment on delivery.</p>
                  <button onClick={simulatePaymentProcess} className="submit-button">Confirm Order</button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;