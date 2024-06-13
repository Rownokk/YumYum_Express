import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [count, setCount] = useState(0); // State to manage the count for the current item

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

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={image} alt="" />
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
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>Tk.{price}</p>
      </div>
    </div>
  );
}

export default FoodItem;