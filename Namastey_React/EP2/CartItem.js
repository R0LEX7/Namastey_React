import React, { useState, useEffect } from "react";
import { ITEM_IMG_CDN_URL } from "./config";
import { getDatabase, ref, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/firebase-config";

import dummyImg from "./assets/images/dummy.png";

const CartItem = (props) => {
  const { item, itemKey } = props; // Destructure item and itemKey from props
  console.log(itemKey);
  // const item = props?.item;

  const [quantity, setQuantity] = useState(item.quantity);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    
  }, []);


  const db = getDatabase();
  const handleIncreaseQuantity = () => {
    // Increase the quantity of the item and update it in Firebase
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    // Update the quantity in Firebase
    const cartItemRef = ref(db, `carts/${user.uid}/${item.key}`);
    set(cartItemRef, { ...item, quantity: newQuantity });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      // Decrease the quantity of the item and update it in Firebase
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      // Update the quantity in Firebase
      const db = getDatabase();
      const cartItemRef = ref(db, `carts/${user.uid}/${itemKey}`);
      set(cartItemRef, { ...item, quantity: newQuantity });
    }
  };

  return (
    <>
      <div className="cart-card">
        <h1>{item?.name}</h1>
        <div className="item-details">
          <img
            src={item?.imageId ? ITEM_IMG_CDN_URL + item?.imageId : dummyImg}
            alt={item?.imageId || "dummy"}
          />
          <div className="row">
            <h4>₹{item?.price}</h4>
            <h4>Quantity: {item?.quantity}</h4>
            <div className="row-btn">
              <button onClick={handleIncreaseQuantity}>+</button>
              {quantity}
              <button onClick={handleDecreaseQuantity}>-</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
