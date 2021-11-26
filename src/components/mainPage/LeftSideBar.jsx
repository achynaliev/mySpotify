import React from "react";
import "./mainP.css";
import spotify from "../../images/spotify.png";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const LeftSideBar = () => {
  return (
    <div className="leftSideMainCont">
      <img className="mainLogo" src={spotify} alt="" />
      <div className="left-text">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="listItemLeftBar">
            <HomeIcon
              sx={{ fontSize: "28px", color: "white" }}
              className="leftListIcons"
            />
            <h5 className="leftSideListText">Home</h5>
          </div>
        </Link>
        <Link to="/upload" style={{ textDecoration: "none" }}>
          <div className="listItemLeftBar">
            <CloudUploadIcon
              sx={{ fontSize: "28px", color: "white" }}
              className="leftListIcons"
            />
            <h5 className="leftSideListText">Upload</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LeftSideBar;
