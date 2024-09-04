import { createContext } from "react";
import PropTypes from "prop-types";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivry_fee = 10;
    const value = {
        products,
        currency,
        delivry_fee
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

// Define prop types
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
