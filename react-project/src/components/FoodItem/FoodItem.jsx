import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMinusCircle, faTimes, faPencilAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Load reviews from local storage when the component mounts
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(storedReviews.filter(review => review.itemId === id));
  }, [id]);

  // Save reviews to local storage
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    // Update reviews for the current item only
    const updatedReviews = storedReviews.filter(review => review.itemId !== id);
    localStorage.setItem('reviews', JSON.stringify([...updatedReviews, ...reviews]));
  }, [reviews, id]);

  const handleAddToCart = () => {
    setCount(count + 1);
    addToCart(id);
  };

  const handleRemoveFromCart = () => {
    if (count > 0) {
      setCount(count - 1);
      removeFromCart(id);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer', color: i <= rating ? 'crimson' : 'gray' }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleReviewButtonClick = () => {
    setShowReviewForm(true);
  };

  const handleReviewFormClose = () => {
    setShowReviewForm(false);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const reviewText = event.target.review.value;
    const newReview = { itemId: id, text: reviewText, rating };
    setReviews([...reviews, newReview]);
    setShowReviewForm(false);
  };

  const handleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const handleCloseAllReviews = () => {
    setShowAllReviews(false);
  };

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + "/images/" + image} alt="" />
        <div className='food-item-counter'>
          {count > 0 && (
            <FontAwesomeIcon 
              icon={faMinusCircle} 
              onClick={handleRemoveFromCart} 
              style={{ color: 'red', cursor: 'pointer' }}
            />
          )}
          {count > 0 && <p>{count}</p>}
          <FontAwesomeIcon 
            icon={faHeart} 
            onClick={handleAddToCart} 
            style={{ color: 'crimson', cursor: 'pointer' }}
          />
        </div>
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div className='food-item-rating'>
            {renderStars()}
          </div>
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>Tk.{price}</p>
        <div className="review-buttons">
          <button onClick={handleReviewButtonClick} className="review-btn">Leave a Review</button>
          <FontAwesomeIcon 
            icon={faStar} 
             
            onClick={handleShowAllReviews} 
            style={{ color: 'lightcoral', cursor: 'pointer', marginLeft: '10px' }}
            className="review-icon"
          />
        </div>
      </div>
      {showReviewForm && (
        <div className='review-form'>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={handleReviewFormClose}
            className="close-icon"
          />
          <form onSubmit={handleReviewSubmit}>
            <textarea name="review" placeholder="Write your review here" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {showAllReviews && (
        <div className='all-reviews'>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={handleCloseAllReviews}
            className="close-icon"
          />
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className='review-item'>
                <p>{review.text}</p>
                <div className='review-rating'>
                  {renderStars().map((star, i) => (
                    <span key={i} style={{ color: i < review.rating ? 'crimson' : 'gray' }}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FoodItem;
