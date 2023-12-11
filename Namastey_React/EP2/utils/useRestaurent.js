
import { useEffect , useState } from "react";
import { swiggy_api_URL } from "../Config/config";

const useRestaurant = () => {

  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true)

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
          setLoading(false);
          
        } catch (error) {
          console.log(error);
        }
      }
      return{ restaurant , loading};
}

export default useRestaurant;
