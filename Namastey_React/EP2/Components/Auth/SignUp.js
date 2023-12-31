import React, { useState} from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link , useNavigate } from "react-router-dom";
import {
  signOut,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../../Config/firebase-config";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Import the component here

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// function component
const SignUp = () => {

  const navigate = useNavigate();
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email === "" || password === undefined || password === "") {
      handleClick("error", "Fill both the fields."); // Show an error Snackbar
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      handleClick("success", "Registered Successfully!"); // Show a success Snackbar
      setTimeout(() => {
        navigate('/about-user')
      }, 2000)
    } catch (err) {
      console.error(err);
      const errorMessage = err.message || "An error occurred.";
      const customErrorMessage = errorMessage.replace("Firebase:", "Yummiee:").trim();
      console.log(customErrorMessage)
      handleClick("error", customErrorMessage); // Show an error Snackbar with Firebase error message
    }
  };
  

  return (
    <>
      <div className="form-box">
        <div className="div">
          <HiOutlineMail />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
          />
        </div>
        <div className="div">
          <RiLockPasswordLine />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
          />
        </div>

        <div className="flexBtn">
          <button onClick={() => handleSubmit()}>Submit</button>
          <p>--OR--</p>
          <Link to="/">
            <button>cancel</button>
          </Link>
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
    </>
  );
}

export default SignUp;
