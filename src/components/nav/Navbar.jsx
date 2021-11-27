import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "../mainPage/mainP.css";

const Navbar = () => {
  let user = localStorage.getItem("userFields");
  user = JSON.parse(user);
  console.log(user);

  return (
    <div className="navContainer">
      <div className="navNavigation">
        <ArrowBackIosIcon />
        <ArrowForwardIosIcon />
      </div>
      <div className="NavUserProfile">
        <img className="userAva" src={user.imageURL.stringValue} alt="" />
        <h4 className="NavUsername">{user.username.stringValue}</h4>
        <ArrowDropDownIcon />
      </div>
    </div>
  );
};

export default Navbar;
