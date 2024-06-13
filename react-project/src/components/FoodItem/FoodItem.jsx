// FoodItem.js

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const FoodItem = ({ id, name, price, description, image }) => {
  const { addToCart } = useContext(StoreContext);
  const history = useHistory();

  const handleAddToCart = () => {
    addToCart(id); // Add item to cart
    history.push('/cart'); // Navigate to cart page immediately after adding to cart
  };

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={image} alt="" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>Tk.{price}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default FoodItem;
