import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./mainPage/mainP.css";

const Navbar = () => {
  return (
    <div className="navContainer">
      <div className="navNavigation">
        <ArrowBackIosIcon />
        <ArrowForwardIosIcon />
      </div>
      <div className="NavUserProfile">
        <h5>Chynaliev</h5>
        <ArrowDropDownIcon />
      </div>
    </div>
  );
};

export default Navbar;
