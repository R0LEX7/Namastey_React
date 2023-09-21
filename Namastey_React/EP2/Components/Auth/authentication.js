import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Config/firebase-config";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import AboutUserPage from "../Pages/AboutUserPage";
import Loader from "../Loader/Loader";

const Authentication = () => {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#008001",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#08080B",
        dark: "#ba000d",
        contrastText: "#000",
      },
      fontColor: {
        main: "#D6CDCD",
      },
      gold: {
        main: "#ffff",
      },
    },
  });
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(true);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    setLoading(false);
  }, []);

  const [alignment, setAlignment] = useState("register");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  console.log(user);
  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Loader/>
      ) : (
        <div className="form">
          {user === null ? (
            <>
              <ToggleButtonGroup
                className="btn-grp"
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Register or Sign In"
              >
                <ToggleButton className="btn" value="register">
                  Register
                </ToggleButton>
                <ToggleButton className="btn" value="signIn">
                  Sign In
                </ToggleButton>
              </ToggleButtonGroup>
              {alignment === "register" ? <SignUp /> : <SignIn />}
            </>
          ) : (
            <AboutUserPage/>
          )}
        </div>
      )}
    </ThemeProvider>
  );
};

export default Authentication;
