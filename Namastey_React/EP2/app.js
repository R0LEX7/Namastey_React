import React, { useEffect, useState, useContext } from "react";
import Header from "./Header";
import { ThemeProvider } from '@mui/material/styles';
import RestaurantCard from "./RestaurantCard";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import useRestaurant from "./utils/useRestaurent";
import { filterData } from "./utils/functions";
import useOnline from "./utils/useOnline";
import { UserAuthContextProvider, useUserAuth  , userAuthContext} from "./Config/userAuthPhone.js"; 

import muiTheme from "./utils/muiTheme";





const app = () => {
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");


  const restaurant = useRestaurant();

  const {setUpRecaptcha , logOut} = useUserAuth();

  useEffect(() => {
    setFilteredRestaurant(restaurant);
    console.log(filteredRestaurant);
  }, [restaurant]);

  const isOnline = useOnline();

  if (!isOnline)
    return (
      <div className="offline">
        <h1>Check Your Internet connection and try again!!!</h1>
      </div>
    );

  // early return is there is no restaurant
  if (!filteredRestaurant) return null;

 

  return (
    
    <ThemeProvider theme={muiTheme}>
      <Header/>
      

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
            <Link
              to={`/restaurant/${restaurant.info.id}`}
              key={restaurant?.info.id}
            >
              <RestaurantCard restaurant={restaurant?.info} />
            </Link>
          );
        })}
      </div>
    </ThemeProvider>
    
  );
};

export default app;
