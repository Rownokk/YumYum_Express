import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Named export for the context
export const StoreContext = createContext(null);

// Default export for the provider
const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const [food_list, setFoodList] = useState([]);
    const url = 'http://localhost:2000';

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    
        // Reduce quantity in food_list
        setFoodList(prevFoodList =>
            prevFoodList.map(item =>
                item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    
        if (token) {
            try {
                await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    };
    

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedItems = { ...prev };
            if (updatedItems[itemId] > 1) {
                updatedItems[itemId] -= 1;
            } else {
                delete updatedItems[itemId];
            }
            return updatedItems;
        });
        if (token) {
            try {
                await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + '/api/food/list');
            setFoodList(response.data.data);
        } catch (error) {
            console.error('Error fetching food list:', error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error('Error loading cart data:', error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        };
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

StoreContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StoreContextProvider;