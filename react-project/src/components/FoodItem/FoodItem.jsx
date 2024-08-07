import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

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
    console.log(`Review for item ${id}: ${reviewText}`);
    setShowReviewForm(false);
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
        <button onClick={handleReviewButtonClick}>Leave a Review</button>
      </div>
      {showReviewForm && (
        <div className='review-form'>
          <form onSubmit={handleReviewSubmit}>
            <textarea name="review" placeholder="Write your review here" required></textarea>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReviewFormClose}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FoodItem;
