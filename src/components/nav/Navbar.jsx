import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "../mainPage/mainP.css";

const Navbar = () => {
  let user = localStorage.getItem("userFields");
  user = JSON.parse(user);
  const [userState, setUserState] = useState({ imageURL: "", username: "" });

  const setUser = () => {
    user = localStorage.getItem("userFields");
    user = JSON.parse(user);
    if (user) {
      setUserState({
        imageURL: user.imageURL.stringValue,
        username: user.username.stringValue,
      });
    }
  };

  React.useEffect(() => {
    if (user) {
      setUserState({
        imageURL: user.imageURL.stringValue,
        username: user.username.stringValue,
      });
    } else {
      setTimeout(() => setUser(), 2800);
    }
  }, []);

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <div className="navNavigation">
          <ArrowBackIosIcon />
          <ArrowForwardIosIcon />
        </div>
        <div className="NavUserProfile">
          <img className="userAva" src={userState.imageURL} alt="" />
          <h4 className="NavUsername">@{userState.username}</h4>
          <ArrowDropDownIcon />
        </div>
      </div>
      <div className="blurred"></div>
    </div>
  );
};

export default Navbar;
