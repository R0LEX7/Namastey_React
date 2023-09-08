import React from 'react'
import { ITEM_IMG_CDN_URL } from './config';
import dummyImg from "./assets/images/dummy.png";


const CartItem = (props) => {
    console.log(props);
    const item = props?.item;
  return (
    <>
    <div className="cart-card">
      <h1>{item?.name}</h1>
    <div className="item-details">
    <img
          src={item?.imageId ? ITEM_IMG_CDN_URL +item?.imageId : dummyImg}
          alt={item?.imageId || "dummy"}
        />
<div className="row">
<img
          src={item?.imageId ? ITEM_IMG_CDN_URL +item?.imageId : dummyImg}
          alt={item?.imageId || "dummy"}
        />
        <h3>{item?.price}</h3>
        <h4>Quantity: {item?.quantity}</h4></div>
    </div>
    </div>
    </>
  )
}

export default CartItem