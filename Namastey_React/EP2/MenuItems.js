import React, { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { ITEM_IMG_CDN_URL } from "./config";
import dummyImg from "./assets/images/dummy.png";
// import userContext from "./utils/userContext";
import firebase from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {Alert} from "./Alerts/SnackbarAlert";
import { auth } from "./Config/firebase-config";

// setting Alert
// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const MenuItems = (props) => {
  console.log(props);

  const {
    name,
    description,
    price,
    category,
    imageId,
    inStock,
    isVeg,
    ratings,
  } = props.menuItem;
  const newRating = ratings?.aggregatedRating?.rating;
  const newPrice = price / 100;

/* setting toast */
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleClick = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const addItemToCart = () => {
    if (user === null) {
      handleClick("info", "Please Login for add to cart");
      return;
    } else {
      const db = getDatabase();
      const newItem = {
        name: name,
        price: newPrice,
        quantity: 1,
        rating: ratings || 0,
        imageId: imageId || "",
        isVeg: isVeg || false,
      };
  
      const cartRef = ref(db, `carts/${user.uid}/`);
  
      try {
        // Use push to add a new item to the user's cart
        const newItemRef = push(cartRef, newItem);
        handleClick("success", "Item added to cart successfully");
  
        console.log("Added to cart with key:", newItemRef.key);
      } catch (error) {
        console.error("Error adding item to cart:", error);
        handleClick("error", "An error occurred while adding the item to the cart");
      }
    }
  };
  

  return (
    <>
      <div className="menu-Card">
        <img
          src={imageId ? ITEM_IMG_CDN_URL + imageId : dummyImg}
          alt={imageId}
        />
        <div className="flex">
          <h3>{name}</h3>
          <h5>{description}</h5>
          <div className="details">
            <h4>Category: </h4>
            <h4>{isVeg ? "🟢Veg" : "🔴Non-Veg"}</h4>
            <h4>{category}</h4>
          </div>
          <div className="details">
            <span className={newRating > 3.8 ? "green" : "red"}>
              <AiFillStar />
              {newRating ? newRating : "NA"}
            </span>
            <h3> {price ? "₹" + newPrice +".00": "Not available"}</h3>
            {price && <button onClick={addItemToCart}> Add</button>}
          </div>
        </div>
        <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      </div>
    </>
  );
};

export default MenuItems;
