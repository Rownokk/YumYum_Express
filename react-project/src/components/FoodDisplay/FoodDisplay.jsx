import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleItemClick = (id) => {
        addToCart(id);
        navigate('/cart'); // Navigate to the Cart page
    };

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <div key={index} onClick={() => handleItemClick(item._id)}>
                                <FoodItem
                                    id={item._id}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;