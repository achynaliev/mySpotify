import React from "react";
import "./mainP.css";
import spotify from "../../images/spotify.png";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AlbumIcon from "@mui/icons-material/Album";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import artist from "../../images/artist.png";

const LeftSideBar = () => {
  const handleCreatePlaylist = () => {
    console.log("here");
  };

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
            <h5 className="leftSideListText">Explore</h5>
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
        <Link to="/store" style={{ textDecoration: "none" }}>
          <div className="listItemLeftBar">
            <ProductionQuantityLimitsIcon
              sx={{ fontSize: "28px", color: "white" }}
              className="leftListIcons"
            />
            <h5 className="leftSideListText">Store</h5>
          </div>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="listItemLeftBar">
            <img
              src={artist}
              alt=""
              style={{ width: "28px", height: "28px" }}
            />
            <h5 className="leftSideListText">Artists</h5>
          </div>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="listItemLeftBar">
            <AlbumIcon
              sx={{ fontSize: "28px", color: "white" }}
              className="leftListIcons"
            />
            <h5 className="leftSideListText">Albums</h5>
          </div>
        </Link>
        <div onClick={() => handleCreatePlaylist()} className="listItemLeftBar">
          <AddBoxIcon
            sx={{ fontSize: "28px", color: "white" }}
            className="leftListIcons"
          />
          <h5 className="leftSideListText">Create Playlist</h5>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
