import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/firebase-config";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import CartItem from "./CartItem";
// import firebase

const CartPage = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [gstPrice, setGstPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    if (cartItems.length > 0 && user) {
      getCartPrice();
    }
  }, [user, cartItems]);

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

  console.log(cartItems);

  const clearCart = (user) => {
    if (!user) return;

    const cartRef = ref(db, `carts/${user.uid}/`);
    remove(cartRef);
    setCartItems([]);
    setCartPrice(0);
    setGstPrice[0];
    setTotalPrice[0];
  };

  const getCartPrice = () => {
    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + item?.price * item?.quantity;
    }, 0);
    setCartPrice(totalPrice);
    const gst = (totalPrice * 0.18).toFixed(2); // Calculate GST as 18% of cartPrice
    const total = totalPrice + parseFloat(gst) + 50; // Convert gst to a number using parseFloat

    setGstPrice(gst);
    setTotalPrice(total);
  };

  // console.log(cartPrice);

  return (
    <>
      {user === null ? (
        <h1>login please</h1>
      ) : (
        <>
          <div className="cart">
            <div className="cart-header">
              <h1>Cart</h1>{" "}
              <button onClick={() => clearCart(user)}>Clear Cart</button>
            </div>
 <div className="cart-row">
 <div className="cart-items">
            {cartItems.map((item, index) => {
              return <CartItem item={item} itemKey={item.key} key={index} />;
            })}
              </div>
            <div className="pricing">
              <div className="pricing-details">
                <h3>price :</h3>
                <h3>GST :</h3>
                <h3>Delivery :</h3>
                <h3>total price :</h3>
              </div>
              <div className="pricing-details">
                <h3>₹{cartPrice}</h3>
                <h3>+₹{gstPrice}</h3>
                <h3>+₹50</h3>
                <h3>₹{totalPrice}</h3>
            </div>
            </div>
 </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;
