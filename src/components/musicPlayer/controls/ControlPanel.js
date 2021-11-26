import React from "react";
import Button from "./Button";
import "./control-panel.css";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

function ControlPanel({
  play,
  isPlaying,
  setCurrent,
  setCurrentSong,
  playListLen,
  current,
  setAutoP,
}) {
  const playNext = (e) => {
    let currentPlayList = localStorage.getItem("currentPlayList");
    currentPlayList = JSON.parse(currentPlayList);
    setAutoP(true);
    if (playListLen === current) {
      setCurrent(0);
      let fileURL =
        currentPlayList[0]["_document"].data.value.mapValue.fields.fileUrl
          .stringValue;
      setCurrentSong(fileURL);
      play();
    } else {
      let newCurrent = current + 1;
      setCurrent(newCurrent);
      let fileURL =
        currentPlayList[newCurrent]["_document"].data.value.mapValue.fields
          .fileUrl.stringValue;
      setCurrentSong(fileURL);
      play();
    }
  };

  const playPrev = (e) => {
    let currentPlayList = localStorage.getItem("currentPlayList");
    currentPlayList = JSON.parse(currentPlayList);
    setAutoP(true);
    if (current === 0) {
      setCurrent(playListLen);
      let fileURL =
        currentPlayList[playListLen]["_document"].data.value.mapValue.fields
          .fileUrl.stringValue;
      setCurrentSong(fileURL);
      play();
    } else {
      let newCurrent = current - 1;
      setCurrent(newCurrent);
      let fileURL =
        currentPlayList[newCurrent]["_document"].data.value.mapValue.fields
          .fileUrl.stringValue;
      setCurrentSong(fileURL);
      play();
    }
  };

  return (
    <div className="control-panel">
      <SkipPreviousIcon sx={{ fontSize: "40px" }} onClick={(e) => playPrev(e)}>
        prev
      </SkipPreviousIcon>
      <Button play={play} isPlaying={isPlaying} />
      <SkipNextIcon sx={{ fontSize: "40px" }} onClick={(e) => playNext(e)}>
        next
      </SkipNextIcon>
    </div>
  );
}
export default ControlPanel;
