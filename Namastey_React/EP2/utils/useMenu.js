import { useEffect, useState } from "react";
import {
  swiggy_menu_api_URL,
  RESTAURANT_TYPE_KEY,
  MENU_ITEM_TYPE_KEY,
} from "../Config/config";

const useMenu = (id) => {
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getMenu(swiggy_menu_api_URL);
  }, [id]); // Add 'id' to the dependency array

  async function getMenu(url) {
    try {
      const response = await fetch(url + id);
      const menuData = await response.json();

      // Set restaurant data
      const restaurantData =
        menuData?.data?.cards
          ?.map((x) => x.card)
          ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
          ?.info || null;

      setRestaurant(restaurantData);
      //   console.log(menuData);

      const menuItemsData =
        menuData?.data?.cards
          .find((x) => x.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
          ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
          ?.map((x) => x.itemCards)
          .flat()
          .map((x) => x.card?.info) || [];

          setLoading(false);
      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });
      setMenu(uniqueMenuItems);
    } catch (error) {
      setMenu([]);
      setRestaurant(null);
      console.error("Error fetching menu:", error);
    }
  }
  return {restaurant, menu , loading};
};

export default useMenu;
