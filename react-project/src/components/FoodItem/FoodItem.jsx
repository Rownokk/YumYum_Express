import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [count, setCount] = useState(0);

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
        <p>{name}</p>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>Tk.{price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
