import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './paymentConfirmation.css';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedOption } = location.state || {};

  const [rating, setRating] = useState(0); // Rating state
  const [review, setReview] = useState(''); // Review text state
  const [submitted, setSubmitted] = useState(false); // Track if review is submitted

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setSubmitted(false); // Reset submission status when rating is changed
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle review submission logic here
    console.log(`Rating: ${rating}, Review: ${review}`);

    // Reset the review box
    setRating(0);
    setReview('');
    setSubmitted(true); // Mark review as submitted
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer', color: i <= rating ? 'crimson' : 'gray', fontSize: '2rem' }}
        >
          ★
        </span>
      );
    }
    return stars;
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

        {/* Review and Rating Section */}
        <div className="review-section">
          <h3>Rate Our App</h3>
          <div className="star-rating">
            {renderStars()}
          </div>
          <textarea
            placeholder="Write your review here..."
            value={review}
            onChange={handleReviewChange}
            rows="4"
            cols="50"
          ></textarea>
          <button className="submit-review-button" onClick={handleSubmit}>
            Submit Review
          </button>
          {submitted && <p className="submission-message">Thank you for your feedback!</p>}
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;



