import React, { useState, useEffect  , useContext} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/firebase-config";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import CartItem from "./CartItem";
import emptyCartImg from "./assets/images/emptyCart.png";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "./Alerts/SnackbarAlert";
import PaymentComp from "./PaymentComp"
import Footer from "./Footer";
import { CartProvider } from "./CartContext";

import CartContext from "./CartContext";
// import firebase

const CartPage = () => {
  const { cartItems, setCartItems ,getCartItems , clearCart  } = useContext(CartContext);

  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleClick = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };



  const [user, setUser] = useState(null);
  // console.log(useCart());
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

  const handlePaymentCOD = () => {
    setTimeout(() => {
      handleClick("success", "Payment done successfully");
  }, 1500);
  setTimeout(() => {
      clearCart(user);
  }, 2000);
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
          id="card"
          name="paymentMethod"
          value="card"
          checked={selectedMethod === "card"}
          onChange={handleMethodChange}
        />
        <label htmlFor="card">Pay with Card</label>
      </div>
      {/* <button onClick={handlePayment}>Proceed to Payment</button> */}
    </div>
      {selectedMethod === "card" && <PaymentComp/> }
      {selectedMethod === "cashOnDelivery" &&  <button onClick={handlePaymentCOD}>Order</button> }
                
                </div>


              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <img src={emptyCartImg} alt="emptyCart" />
            </div>
          )}
          <Footer />
          <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
        </>
      )}
    </>
  );
};

export default CartPage;
