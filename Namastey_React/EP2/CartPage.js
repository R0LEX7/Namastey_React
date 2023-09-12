import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/firebase-config";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import CartItem from "./CartItem";
import emptyCartImg from "./assets/images/emptyCart.png";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "./Alerts/SnackbarAlert";
import Footer from "./Footer";
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
    const total = parseFloat((totalPrice + parseFloat(gst) + 50).toFixed(3)); // Convert gst to a number using parseFloat

    setGstPrice(gst);
    setTotalPrice(total);
  };

  // for payment 
  const [selectedMethod, setSelectedMethod] = useState("cashOnDelivery");

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handlePayment = () => {
    // Implement your payment logic here based on the selectedMethod
    if (selectedMethod === "cashOnDelivery") {
      // Handle Cash on Delivery
      console.log("cod")
    } else if (selectedMethod === "upi") {
      // Handle UPI payment
      console.log("upi")
    }else{
      console.log("select payment method")
    }
  };

  return (
    <>
      {user === null ? (
        <h1>login please</h1>
      ) : (
        <>
          {cartItems.length > 0 ? (
            <div className="cart">
              <div className="cart-header">
                <h1>Cart</h1>{" "}
                <button onClick={() => clearCart(user)}>Clear Cart</button>
              </div>
              <div className="cart-row">
                <div className="cart-items">
                  {cartItems.map((item, index) => {
                    return (
                      <CartItem item={item} itemKey={item.key} key={index} />
                    );
                  })}
                </div>
                <div className="column">

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
                <div className="payment-container">
      <h2>Select Payment Method</h2>
      <div>
        <input
          type="radio"
          id="cashOnDelivery"
          name="paymentMethod"
          value="cashOnDelivery"
          checked={selectedMethod === "cashOnDelivery"}
          onChange={handleMethodChange}
        />
        <label htmlFor="cashOnDelivery">Cash on Delivery</label>
      </div>
      <div>
        <input
          type="radio"
          id="upi"
          name="paymentMethod"
          value="upi"
          checked={selectedMethod === "upi"}
          onChange={handleMethodChange}
        />
        <label htmlFor="upi">UPI</label>
      </div>
      {selectedMethod === "upi" ?(console.log("display when upi selected")) : (console.log("fuck")) }
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
                 <button>Order</button>
                </div>


              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <img src={emptyCartImg} alt="emptyCart" />
            </div>
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default CartPage;
