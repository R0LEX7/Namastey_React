import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

import { IMG_CDN_URL } from "./config";
import MenuItems from "./MenuItems";
import useMenu from "./utils/useMenu";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();

  const data = useMenu(id);

  useEffect(() => {
    setRestaurant(data[0]);
    setMenu(data[1]);
  }, [data]);

  return (
    <div className="main">
      <div className="restaurant-summary">
        <img src={IMG_CDN_URL + restaurant?.cloudinaryImageId} alt="" />
        <div className="restaurant-details">
          <h3>{restaurant?.name}</h3>
          <h4>{restaurant?.cuisines.join(", ")} </h4>
          <h4>{restaurant?.veg ? "🟢Veg" : "🔴Non-Veg"}</h4>
          <div className="details">
            <h4>{restaurant?.areaName}</h4>
            <h4>• {restaurant?.sla?.lastMileTravelString ?? "2.0 km"} •</h4>
          </div>
          <div className="details">
            <h4>{restaurant?.city}</h4>
            <h4>• {restaurant?.sla.slaString} •</h4>
          </div>
          <div className="details">
            <h4>{restaurant?.availability?.nextCloseTime}</h4>
            <h4> {restaurant?.isOpen ? "🟢Opened🟢" : "🔴Closed🔴"} </h4>
          </div>
          <div className="details">
            <span className={restaurant?.avgRating > 3.8 ? "green" : "red"}>
              <span className="star"><AiFillStar /></span>
              {restaurant?.avgRating}
            </span>
            <h4>{restaurant?.costForTwoMessage ?? "₹ 200 for Two"}</h4>
          </div>
        </div>
      </div>

      <div className="restaurant-menu">
        <h3>Menu</h3>
        <h3>{menu.length} Items</h3>
        {menu.map((item) => {
          return <MenuItems menuItem={item} />;
        })}
      </div>
    </div>
  );
};

export default Menu;
