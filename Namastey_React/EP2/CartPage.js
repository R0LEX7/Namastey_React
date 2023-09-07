import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/firebase-config";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import CartItem from "./CartItem";
// import firebase

const CartPage = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartPrice, setCartPrice] = useState(0)
  const [gstPrice, setGstPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0)

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

  useEffect(()=> {
    if (cartItems.length > 0 && user) {
        getCartPrice();
        setGstPrice(cartPrice/100*18);
        setTotalPrice(cartPrice + gstPrice + 50)
    }
  },[user , cartItems]);

  const db = getDatabase();
  const getCartItems = (user) => {
    const cartRef = ref(db, `carts/${user.uid}/`);

    onValue(cartRef, (snapshot) => {
      const cartData = snapshot.val();
      if (cartData) {
        const cartItemsArray = Object.values(cartData);
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
    setCartPrice(0);
  };



  const getCartPrice = () =>{
    const totalPrice = cartItems.reduce((acc, item) =>{
        return acc + item?.price * item?.quantity;
    }, 0)
    setCartPrice(totalPrice);
  };

  console.log(cartPrice);

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
            {cartItems.map((item, index) => {
              return <CartItem key={index} item={item} />;
            })}
            <div className="pricing">
                <h3>price :   {cartPrice}</h3>
                <h3>GST :   + {gstPrice}</h3>
                <h3>Delivery :   + 50</h3>
                <h3>price :    {totalPrice}</h3>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;
