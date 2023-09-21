import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logoImg from "../../assets/Logo/Logo.png";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 , marginTop : 0 }}>
      <AppBar position="static" style={{backgroundColor: '#08080b'}}>
        <Toolbar>
          
          <div className="logo-img">

            <img src={logoImg} alt="logo" />
          </div>
            {/* <MenuIcon /> */}
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , fontFamily: "sans-serif" , fontSize : "1.3rem" }}>
            Zesty Bites
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}