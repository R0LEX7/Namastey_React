import React, { createContext, useContext, useState , useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./Config/firebase-config";
import { getDatabase, ref, onValue, remove } from "firebase/database";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getCartItems(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  // useEffect(() => {
  //   if (cartItems.length > 0 && user) {
  //     getCartPrice();
  //   }
  // }, [user, cartItems]);

  const db = getDatabase();
  const getCartItems = (user) => {
    const cartRef = ref(db, `carts/${user.uid}/`);

    onValue(cartRef, (snapshot) => {
      const cartData = snapshot.val();
      if (cartData) {
        const cartItemKeys = Object.keys(cartData);
        const cartItemsArray = cartItemKeys.map((key) => ({
          key: key,
          ...cartData[key],
        }));
        setCartItems(cartItemsArray);
      } else {
        // Handle when the user's cart is empty
        setCartItems([]);
      }
    });
  };

  const clearCart = (user) => {
    if (!user) return;

    const cartRef = ref(db, `carts/${user.uid}/`);
    remove(cartRef);
    setCartItems([]);
  };

  // ... other functions or state management related to the cart

  return (
    <CartContext.Provider value={{ cartItems, setCartItems ,getCartItems , clearCart , user  }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
