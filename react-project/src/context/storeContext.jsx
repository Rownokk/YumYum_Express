
import { createContext } from 'react';
import PropTypes from 'prop-types';
import { food_list } from '../assets/assets';
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const contextValue = {
        // add your context value here
        food_list
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
