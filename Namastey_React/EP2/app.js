import React, { useEffect, useState, useRef } from "react";
import RestaurantCard from "./Components/Pages/RestaurantCard";
import { Link } from "react-router-dom";
import useRestaurant from "./utils/useRestaurent";
import { filterData } from "./utils/functions";
import useOnline from "./utils/useOnline";
import LabelBottomNavigation from "./Components/Layout/LabelBottomNavigation";

import Footer from "./Components/Layout/Footer";
import Loader from "./Components/Loader/Loader";
import Header from "./Components/Layout/Header";

const app = () => {
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");


  const { restaurant, loading } = useRestaurant();

  const searchInputRef = useRef(null);

  useEffect(() => {
    setFilteredRestaurant(restaurant);
  }, [restaurant]);

  const isOnline = useOnline();

  console.log(loading);

  if (!isOnline)
    return (
      <div className="offline">
        <h1>Check Your Internet connection and try again!!!</h1>
      </div>
    );

  // early return is there is no restaurant
  if (!filteredRestaurant) return null;

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <form
            // action="submit"
            className="search"
            onSubmit={(e) => {
              e.preventDefault();
              setFilteredRestaurant(restaurant);
              const trimmedSearchText = searchText.trim();
              if (trimmedSearchText.length > 0) {
                setSearchText(trimmedSearchText); // Update the state
                const filteredData = filterData(trimmedSearchText, restaurant);
                setFilteredRestaurant(filteredData);
              }
            }}
          >
            <input
              type="text"
              placeholder={"Search ..."}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              ref={searchInputRef}
            />
          </form>
          <div className="restaurants">
            {filteredRestaurant.map((restaurant) => {
              return (
                <Link className="res-card"
                  to={`/restaurant/${restaurant.info.id}`}
                  key={restaurant?.info.id}
                >
                  <RestaurantCard restaurant={restaurant?.info} />
                </Link>
              );
            })}
          </div>
          <Footer />
          <LabelBottomNavigation />
        </>
      )}
    </>
  );
};

export default app;
