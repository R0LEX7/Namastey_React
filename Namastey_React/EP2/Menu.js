import React, { useState, useEffect, lazy, Suspense , useContext } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IMG_CDN_URL } from "./config";
import Footer from "./Footer";
import useMenu from "./utils/useMenu";
import LabelBottomNavigation from "./LabelBottomNavigation";

const MenuItems = lazy(() => import("./MenuItems"))

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
      {restaurant?.hasBestsellerItems  && <div class="ribbon"><span>best seller</span></div>}
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
        <div className="menu">

        {menu.map((item) => {
          return <Suspense key = {item?.id}><MenuItems menuItem={item} /></Suspense>;
        })}
        </div>
      </div>
      <Footer/>
      <LabelBottomNavigation/>
    </div>
  );
};

export default Menu;
