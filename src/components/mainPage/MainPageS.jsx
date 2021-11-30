import React from "react";
import Navbar from "../nav/Navbar";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import SongList from "../songsList/SongList";
import MusicPlayer from "../musicPlayer/MusicPlayer";
import { useLocation } from "react-router";
import UploadSongs from "../addingSongs/UploadSongs";
import MainStore from "../store/MainStore";
import CartMainPage from "../cart/CartMainPage";
import "./mainP.css";

const MainPageS = () => {
  let location = useLocation();
  console.log(location.pathname);

  let mainContent;
  if (location.pathname === "/") {
    mainContent = <SongList />;
  } else if (location.pathname === "/upload") {
    mainContent = <UploadSongs />;
  } else if (location.pathname.includes("/store")) {
    mainContent = <MainStore />;
  } else if (location.pathname === "/cart") {
    mainContent = <CartMainPage />;
  }

  return (
    <div className="bodyCont">
      <LeftSideBar />
      <div className="mainMainCont">
        <Navbar />
        {mainContent}
      </div>
      <RightSideBar />
      <MusicPlayer />
    </div>
  );
};

export default MainPageS;
