import React from "react";
import Navbar from "../Navbar";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import SongList from "../songsList/SongList";
import MusicPlayer from "../musicPlayer/MusicPlayer";
import { useLocation } from "react-router";
import UploadSongs from "../addingSongs/UploadSongs";
import "./mainP.css";

const MainPageS = () => {
  let location = useLocation();

  let mainContent;
  if (location.pathname === "/") {
    mainContent = <SongList />;
  } else if (location.pathname === "/upload") {
    mainContent = <UploadSongs />;
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
