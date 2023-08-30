import React, { useEffect, useState } from "react";
import Header from "./Header";
import { res, swiggy_api_URL } from "./config";
import RestaurantCard from "./RestaurantCard";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

// Search functionality

function filterData(text, data) {
  return data.filter((item) =>
    item?.info?.name.toLowerCase().includes(text.toLowerCase())
  );
}

// console.log(res)
const app = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const response = await fetch(swiggy_api_URL);
      const json = await response.json();

      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          let checkData =
            jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          if (checkData !== undefined) return checkData;
        }
      }

      const resData = await checkJsonData(json);
      console.log(resData);
      setRestaurant(resData);
      setFilteredRestaurant(resData);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(filteredRestaurant);
  return (
    <>
      {/* <Header/> */}
      <div className="search">
        <input
          type="text"
          placeholder={"Search ..."}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={() => {
            setFilteredRestaurant(restaurant);
            const trimmedSearchText = searchText.trim();
            if (trimmedSearchText.length > 0) {
              setSearchText(trimmedSearchText); // Update the state
              const filteredData = filterData(trimmedSearchText, restaurant);
              setFilteredRestaurant(filteredData);
            }
          }}
        >
          <BsSearch />
        </button>
      </div>
      <div className="restaurants">
        {filteredRestaurant.map((restaurant) => {
          return (
           <Link to = {`/restaurant/${restaurant.info.id}`}  key={restaurant?.info.id}>
             <RestaurantCard
             
              restaurant={restaurant?.info}
            />
           </Link>          );
        })}
      </div>
    </>
  );
};

export default app;
