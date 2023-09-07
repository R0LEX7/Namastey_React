import React from 'react'
import { ITEM_IMG_CDN_URL } from './config';
import dummyImg from "./assets/images/dummy.png";


const CartItem = (props) => {
    console.log(props);
    const item = props?.item;
  return (
    <>
    <div className="cart-card">
    <img
          src={item?.imageId ? ITEM_IMG_CDN_URL +item?.imageId : dummyImg}
          alt={item?.imageId || "dummy"}
        />
        <h1>{item?.name}</h1>
        <h3>{item?.price}</h3>
        <h4>Quantity: {item?.quantity}</h4>
    </div>
    </>
  )
}

export default CartItem