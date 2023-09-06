import React  , {useContext}from "react";
import { AiFillStar } from "react-icons/ai";
import { ITEM_IMG_CDN_URL } from "./config";
import dummyImg from "./assets/images/dummy.png";
// import userContext from "./utils/userContext";



const MenuItems = (props) => {
  console.log(props)

  const {
    name,
    description,
    price,
    category,
    imageId,
    inStock,
    isVeg,
    ratings,
  } = props.menuItem;
  const newRating = ratings?.aggregatedRating?.rating;
  const newPrice = Math.floor(price / 100);

  return (
    <>
      <div className="menu-Card">
        <img
          src={imageId ? ITEM_IMG_CDN_URL + imageId : dummyImg}
          alt={imageId}
        />
        <div className="flex">
          <h3>{name}</h3>
          <h5>{description}</h5>
          <div className="details">
            <h4>Category: </h4>
            <h4>{isVeg ? "🟢Veg" : "🔴Non-Veg"}</h4>
            <h4>{category}</h4>
          </div>
          <div className="details">
            <span className={newRating > 3.8 ? "green" : "red"}>
              <AiFillStar />
              {newRating ? newRating : "NA"}
            </span>
            <h3> {price ? '₹' + newPrice :"Not available"}</h3>
            {price && <button> Add</button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItems;
