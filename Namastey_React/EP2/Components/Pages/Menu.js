import React, { useState, useEffect, lazy, Suspense , useContext } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IMG_CDN_URL } from "../../Config/config";
import Footer from "../Layout/Footer";
import useMenu from "../../utils/useMenu";
import LabelBottomNavigation from "../Layout/LabelBottomNavigation";
import { Image , Shimmer } from "react-shimmer";
import Loader from "../Loader/Loader";
import Header from "../Layout/Header";

const MenuItems = lazy(() => import("./MenuItems"))

const Menu = () => {
  
  const [currentMenu, setCurrentMenu] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const { id } = useParams();

  // const data = useMenu(id);

  const {loading , restaurant , menu } = useMenu(id);
  console.log("menu ->" , loading);

  useEffect(() => {
    setCurrentRestaurant(restaurant);
    setCurrentMenu(menu);
  }, [restaurant]);



  return (
   <>
   <Header/>
   {loading ? (<Loader/>) : (<>
    <div className="main">
      
    <div className="restaurant-summary">
    {currentRestaurant?.hasBestsellerItems  && <div class="ribbon"><span>best seller</span></div>}
      <Image src={IMG_CDN_URL + currentRestaurant?.cloudinaryImageId} alt={currentRestaurant?.name} 
      fallback = {<Shimmer width={415} height={260}  />} fadeIn = {true}/>
      <div className="restaurant-details">
        <h3>{currentRestaurant?.name}</h3>
        <h4>{currentRestaurant?.cuisines.join(", ")} </h4>
        <h4>{currentRestaurant?.veg ? "🟢Veg" : "🔴Non-Veg"}</h4>
        <div className="details">
          <h4>{currentRestaurant?.areaName}</h4>
          <h4>• {currentRestaurant?.sla?.lastMileTravelString ?? "2.0 km"} •</h4>
        </div>
        <div className="details">
          <h4>{currentRestaurant?.city}</h4>
          <h4>• {currentRestaurant?.sla.slaString} •</h4>
        </div>
        <div className="details">
          <h4>{currentRestaurant?.availability?.nextCloseTime}</h4>
          <h4> {currentRestaurant?.isOpen ? "🟢Opened🟢" : "🔴Closed🔴"} </h4>
        </div>
        <div className="details">
          <span className={currentRestaurant?.avgRating > 3.8 ? "green" : "red"}>
            <span className="star"><AiFillStar /></span>
            {currentRestaurant?.avgRating}
          </span>
          <h4>{currentRestaurant?.costForTwoMessage ?? "₹ 200 for Two"}</h4>
        </div>
      </div>
    </div>

    <div className="restaurant-menu">
      <h3>Menu</h3>
      <h3>{currentMenu.length} Items</h3>
      <div className="menu">

      {currentMenu.map((item) => {
        return <Suspense key = {item?.id}><MenuItems menuItem={item} /></Suspense>;
      })}
      </div>
    </div>
    <Footer/>
    <LabelBottomNavigation/>
  </div>

   </>)}
   </>
  );
};

export default Menu;
