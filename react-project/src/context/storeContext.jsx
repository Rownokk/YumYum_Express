
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { food_list } from '../assets/assets';
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems,setCartItems]=useState({});
    const addToCart=(itemId)=>{
if(!cartItems[itemId]){
    setCartItems((prev)=>({...prev,[itemId]:1}))
}
else{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
}
    }
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    useEffect (()=>{
        console.log(cartItems);
    },[cartItems])
    const contextValue = {
        // add your context value here
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart


    };

    console.log("StoreContextProvider rendered"); // Debugging output

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

StoreContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StoreContextProvider;

