import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router";
import { authContext } from "../../contexts/AuthContext";
import "../mainPage/mainP.css";

const Navbar = () => {
  let user = localStorage.getItem("userFields");
  user = JSON.parse(user);
  const [userState, setUserState] = useState({ imageURL: "", username: "" });
  const { logOut } = React.useContext(authContext);

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

  let navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/auth");
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

  let randomColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);

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
          <ArrowDropDownIcon onClick={handleLogout} />
        </div>
      </div>
      <div style={{ backgroundColor: randomColor }} className="blurred"></div>
    </div>
  );
};

export default Navbar;
