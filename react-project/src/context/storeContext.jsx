
import { createContext } from 'react';
import PropTypes from 'prop-types';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const contextValue = {
        // add your context value here
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
