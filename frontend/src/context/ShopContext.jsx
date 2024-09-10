import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10; // Fixed typo: 'delivry_fee' -> 'delivery_fee'
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems); // Deep clone cartItems

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increment quantity if size exists
            } else {
                cartData[itemId][size] = 1; // Initialize size with quantity 1
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1; // Initialize item with size and quantity 1
        }

        setCartItems(cartData);
    };

    const getCartCount = () => {
        let totalCount = 0;

        for (const itemId in cartItems) {
            const sizes = cartItems[itemId];
            for (const size in sizes) {
                if (sizes[size] > 0) {
                    totalCount += sizes[size]; // Add the quantity of each size
                }
            }
        }

        return totalCount;
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const value = {
        products,
        currency,
        delivery_fee, // Fixed typo
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

// Define prop types
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
