// FoodDisplay.js

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const history = useHistory();
  const { addToCart } = useContext(StoreContext);

  const handleItemClick = (id) => {
    addToCart(id); // Add item to cart
    history.push('/cart'); // Navigate to the Cart page
  };

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => (
          (category === "All" || category === item.category) && (
            <div key={index}>
              <FoodItem
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
