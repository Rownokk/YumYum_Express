import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './paymentConfirmation.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdRateReview } from 'react-icons/md';
import Confetti from 'react-confetti';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedOption } = location.state || {};

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(savedReviews);
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setSubmitted(false);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReviews = [...reviews, { rating, review }];
    setReviews(newReviews);
    localStorage.setItem('reviews', JSON.stringify(newReviews));
    setRating(0);
    setReview('');
    setSubmitted(true);

    // Trigger celebration effect if 5-star rating
    if (rating === 5) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 3000); // Hide celebration effect after 3 seconds
    }
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer', color: i <= rating ? 'crimson' : '#d1d1d1', fontSize: '2rem' }}
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
          {selectedOption === 'bkash' && <>Your payment via <strong>bKash</strong> was successfully processed!</>}
          {selectedOption === 'paypal' && <>Your payment via <strong>PayPal</strong> was successfully processed!</>}
          {selectedOption === 'cod' && <>Your order has been placed and will be processed for <strong>Cash on Delivery</strong>. Please have the payment ready when the delivery arrives.</>}
        </p>

        {/* Review and Rating Section */}
        <div className="review-section">
          <div className="reviews-toggle">
            <button className="toggle-reviews-button" onClick={toggleReviews}>
              {showReviews ? <FaEyeSlash size={24} color="crimson" /> : <MdRateReview size={24} color="crimson" />}
            </button>
          </div>
          <h3 className="review-heading">Rate Our Website</h3>
          <div className="star-rating">
            {renderStars()}
          </div>
          <textarea
            placeholder="Write your review here..."
            value={review}
            onChange={handleReviewChange}
            rows="4"
            cols="50"
            className="review-textarea"
          ></textarea>
          <button className="submit-review-button" onClick={handleSubmit}>
            Submit Review
          </button>
          {submitted && <p className="submission-message">Thank you for your feedback!</p>}

          {/* Reviews Display */}
          {showReviews && (
            <div className="reviews-list">
              <h4 className="reviews-heading">Customer Reviews:</h4>
              {reviews.length > 0 ? (
                <ul className="reviews-ul">
                  {reviews.map((reviewItem, index) => (
                    <li key={index} className="review-item">
                      <div className="review-rating">
                        {Array(reviewItem.rating).fill('★').join('')}
                        {Array(5 - reviewItem.rating).fill('☆').join('')}
                      </div>
                      <p>{reviewItem.review}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews yet. Be the first to review!</p>
              )}
            </div>
          )}
        </div>

        {/* Back to Home Button within the Box */}
        <div className="bottom-button-container">
          <button className="back-home-button" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>
      </div>
      {celebrate && <Confetti />}
    </div>
  );
};

export default PaymentConfirmation;
