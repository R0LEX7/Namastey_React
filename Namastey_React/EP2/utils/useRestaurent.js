
import { useEffect , useState } from "react";
import { swiggy_api_URL } from "../config";

const useRestaurant = () => {

  const [restaurant, setRestaurant] = useState([]);

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
          // console.log(resData);
          setRestaurant(resData);
          
        } catch (error) {
          console.log(error);
        }
      }
      return restaurant;
}

export default useRestaurant;
