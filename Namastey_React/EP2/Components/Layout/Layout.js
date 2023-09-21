// Layout.js
import React from "react";
import LabelBottomNavigation from "./LabelBottomNavigation";

const Layout = ({ children }) => {
  return (
    <div className="navbar">
      {children}
      <LabelBottomNavigation />
    </div>
  );
};

export default Layout;
