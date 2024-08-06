import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [count, setCount] = useState(0); // State to manage the count for the current item
  const [rating, setRating] = useState(0); // State to manage the rating for the current item

  const handleAddToCart = () => {
    setCount(count + 1); // Increment the count when adding to cart
    addToCart(id);
  };

  const handleRemoveFromCart = () => {
    if (count > 0) {
      setCount(count - 1); // Decrement the count when removing from cart
      removeFromCart(id);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    // Optionally send the rating to the backend here
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer', color: i <= rating ? 'gold' : 'gray' }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + "/images/" + image} alt="" />
        <div className='food-item-counter'>
          {count > 0 && (
            <img onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt="" />
          )}
          {count > 0 && <p>{count}</p>}
          <img onClick={handleAddToCart} src={assets.add_icon_green} alt="" />
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
      </div>
    </div>
  );
}

export default FoodItem;
