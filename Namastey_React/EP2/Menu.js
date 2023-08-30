import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { swiggy_menu_api_URL , RESTAURANT_TYPE_KEY } from './config';

const Menu = () => {
  const [menu, setMenu] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getMenu(swiggy_menu_api_URL);
  }, [id]); // Add 'id' to the dependency array

  async function getMenu(url) {
    try {
      const response = await fetch(url + "74453");
      const menuData = await response.json();

      // Set restaurant data
      const restaurantData = menuData?.data?.cards?.map(x => x.card)?.
                             find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
      setMenu(restaurantData);
      console.log(restaurantData);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  }
  console.log(menu);

  return (
    <div>
      Menu: {id}
      {/* You can map through 'menu' and render the menu items here */}
    </div>
  );
};

export default Menu;
