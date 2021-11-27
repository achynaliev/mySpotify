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
  setTitleAndArtist,
  setCurrentCover,
  setIsPlaying,
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
      let artist =
        currentPlayList[0]["_document"].data.value.mapValue.fields.artistName
          .stringValue;
      let title =
        currentPlayList[0]["_document"].data.value.mapValue.fields.songName
          .stringValue;
      let currentCov =
        currentPlayList[0]["_document"].data.value.mapValue.fields.songCover
          .stringValue;
      setCurrentSong(fileURL);
      setCurrentCover(currentCov);
      setTitleAndArtist({ title, artist });
      play();
      setIsPlaying(true);
    } else {
      let newCurrent = current + 1;
      setCurrent(newCurrent);
      let fileURL =
        currentPlayList[newCurrent]["_document"].data.value.mapValue.fields
          .fileUrl.stringValue;
      let artist =
        currentPlayList[newCurrent]["_document"].data.value.mapValue.fields
          .artistName.stringValue;
      let title =
        currentPlayList[newCurrent]["_document"].data.value.mapValue.fields
          .songName.stringValue;
      let currentCov =
        currentPlayList[newCurrent]["_document"].data.value.mapValue.fields
          .songCover.stringValue;
      setCurrentSong(fileURL);
      setCurrentCover(currentCov);
      setTitleAndArtist({ title, artist });
      play();
      setIsPlaying(true);
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
      let artist =
        currentPlayList[0]["_document"].data.value.mapValue.fields.artistName
          .stringValue;
      let title =
        currentPlayList[0]["_document"].data.value.mapValue.fields.songName
          .stringValue;
      let currentCov =
        currentPlayList[0]["_document"].data.value.mapValue.fields.songCover
          .stringValue;
      setCurrentSong(fileURL);
      setCurrentCover(currentCov);
      setTitleAndArtist({ title, artist });
      play();
      setIsPlaying(true);
    } else {
      let newCurrent = current - 1;
      setCurrent(newCurrent);
      let fileURL =
        currentPlayList[newCurrent]["_document"].data.value.mapValue.fields
          .fileUrl.stringValue;
      let artist =
        currentPlayList[newCurrent]["_document"].data.value.mapValue.fields
          .artistName.stringValue;
      let title =
        currentPlayList[newCurrent]["_document"].data.value.mapValue.fields
          .songName.stringValue;
      let currentCov =
        currentPlayList[newCurrent]["_document"].data.value.mapValue.fields
          .songCover.stringValue;
      setCurrentSong(fileURL);
      setCurrentCover(currentCov);
      setTitleAndArtist({ title, artist });
      play();
      setIsPlaying(true);
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
