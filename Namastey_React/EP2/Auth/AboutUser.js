import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/firebase-config";
import { getDatabase, ref, set, push } from "firebase/database";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../Alerts/SnackbarAlert";
import { BiUserCircle } from "react-icons/bi";
import { BiHomeHeart } from "react-icons/bi";
import { BsTelephoneInbound } from "react-icons/bs";
import LabelBottomNavigation from "../LabelBottomNavigation";

const AboutUser = () => {
  /* for toast */
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

  /* for toast */

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [mob, setMob] = useState(null);
  const [address, setAddress] = useState("");
  const [user, setUser] = useState(null);
  const db = getDatabase();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSet = () => {
    const valUserName = userName.trim();
    const valAddress = address.trim();
    if (
      mob === null ||
      mob.length > 13 ||
      mob.length < 10 ||
      valAddress === "" ||
      valUserName === ""
    ) {
      console.log("Invalid input");
      handleClick("error", "Fill All the fields correctly."); // Show an error Snackbar
      return;
    }
    const about = {
      name: valUserName,
      phoneNumber: mob,
      address: valAddress,
    };

    const userRef = ref(db, `users/${user.uid}/`);
    try {
      const aboutRef = set(userRef, about);
      handleClick("success", "Submitted Successfully!"); // Show a success Snackbar
      console.log("setted");
      setTimeout(() => {
        navigate("/"); // Replace "/home" with the actual path to your home page
      }, 2600);
    } catch (err) {
      const errorMessage = err.message || "An error occurred.";
      const customErrorMessage = errorMessage
        .replace("Firebase:", "Yummiee:")
        .trim();
      console.log(customErrorMessage);
      handleClick("error", customErrorMessage); // Show an error Snackbar with Fireb
    }
  };

  return (
    <div className="form about-form">
      <p>{user ? `User Email: ${user.email}` : ""}</p>

      <div className="form-box">
        <div className="div">
          <BiUserCircle />
          <input
            type="text"
            placeholder="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="on"
          />
        </div>
        <div className="div">
          <BiHomeHeart />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="on"
          />
        </div>
        <div className="div">
          <BsTelephoneInbound />
          <input
            type="number"
            placeholder="Phone Number"
            value={mob}
            onChange={(e) => setMob(e.target.value)}
            autoComplete="on"
          />
        </div>

        <div className="flexBtn">
          <button onClick={handleSet}>Register</button>
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
      <LabelBottomNavigation />
    </div>
  );
};

export default AboutUser;
