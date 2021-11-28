import React, { useState, useRef, useContext } from "react";
import "./musicPlayer.css";
import Slider from "./slider/Slider";
import ControlPanel from "./controls/ControlPanel";
import VolumeControl from "./controls/VolumeControl";
import { playerContext } from "../../contexts/PlayerContext";

const MusicPlayer = () => {
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [current, setCurrent] = useState(0);
  const [playListLen, setPlayListLen] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentCover, setCurrentCover] = useState(null);
  const [autoP, setAutoP] = useState(false);
  const [titleAndArtist, setTitleAndArtist] = useState({
    title: "",
    artist: "",
  });
  const { song, selectASong } = useContext(playerContext);

  function setPlayList() {
    let currentPlayList = localStorage.getItem("currentPlayList");
    currentPlayList = JSON.parse(currentPlayList);
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
    setPlayListLen(currentPlayList.length - 1);
  }

  React.useEffect(() => {
    setTimeout(() => setPlayList(), 2000);
  }, []);

  const playSong = (index) => {
    let currentPlayList = localStorage.getItem("currentPlayList");
    currentPlayList = JSON.parse(currentPlayList);
    setAutoP(true);
    setCurrent(index);
    let fileURL =
      currentPlayList[index]["_document"].data.value.mapValue.fields.fileUrl
        .stringValue;
    let artist =
      currentPlayList[index]["_document"].data.value.mapValue.fields.artistName
        .stringValue;
    let title =
      currentPlayList[index]["_document"].data.value.mapValue.fields.songName
        .stringValue;
    let currentCov =
      currentPlayList[index]["_document"].data.value.mapValue.fields.songCover
        .stringValue;
    setCurrentSong(fileURL);
    setCurrentCover(currentCov);
    setTitleAndArtist({ title, artist });
    play();
    setIsPlaying(true);
  };

  React.useEffect(() => {
    if (song.isPlaying === true) {
      playSong(song.index);
    } else if (song.isPlaying === false) {
      play();
    }
  }, [song]);

  const playNext = () => {
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

  const audioRef = useRef();

  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const onVolumeChange = (vol) => {
    setVolume(vol);
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
  }, [volume]);

  React.useEffect(() => {
    if (percentage === "100.00") {
      playNext();
    }
  }, [percentage]);

  const play = () => {
    const audio = audioRef.current;
    audio.volume = volume;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;
    setPercentage(percent);
    setCurrentTime(time.toFixed(2));
  };

  return (
    <div className="playerMainContainer">
      <img className="currentCover" src={currentCover} alt="" />
      <div className="playerTitleAndArtist">
        <div>
          <h3>{titleAndArtist.title}</h3>
          <h4>{titleAndArtist.artist}</h4>
        </div>
      </div>
      <audio
        autoPlay={autoP}
        ref={audioRef}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration.toFixed(2));
        }}
        src={currentSong}
      ></audio>
      <div className="mainPlayerControls">
        <ControlPanel
          play={play}
          isPlaying={isPlaying}
          playNext={playNext}
          playPrev={playPrev}
        />
        <Slider
          percentage={percentage}
          onChange={onChange}
          duration={duration}
          currentTime={currentTime}
        />
      </div>
      <div className="playerVolumeContols">
        <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
      </div>
    </div>
  );
};

export default MusicPlayer;
