import React , { useState , useContext} from "react";
import { AiFillStar } from "react-icons/ai";
import { IMG_CDN_URL } from "./config";
import CartContext from "./CartContext";


const RestaurantCard = (props) => {

  const val = useContext(CartContext);
  console.log(val);
  

    
  const {
    id,
    name,
    cuisines,
    cloudinaryImageId,
    avgRating,
    locality,
    areaName,
    costForTwo,
    sla,
    
  } = props?.restaurant;

  return (
    <>
      <div className="card box">
    
  

   
        <img src={IMG_CDN_URL + cloudinaryImageId} alt={cloudinaryImageId} />
        <h3>{name}</h3>
        <h5>{cuisines.join(", ")}</h5>
        <div className="details">
          <h5>{areaName}</h5>
          <h4>• {sla?.lastMileTravelString ?? "2.0 km"} •</h4>
        </div>
        <div className="details">
          <span className={avgRating > 3.8 ? "green" : "red"}>
            <AiFillStar />
            {avgRating}
          </span>
          <h4>{costForTwo ?? "₹200 for two"}</h4>
        </div>
        
      </div>
    </>
  );
};

export default RestaurantCard;
