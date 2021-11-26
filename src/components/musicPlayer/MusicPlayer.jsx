import React, { useState, useRef } from "react";
import "./musicPlayer.css";
import Slider from "./slider/Slider";
import ControlPanel from "./controls/ControlPanel";
import VolumeControl from "./controls/VolumeControl";

const MusicPlayer = () => {
  function setPlayList() {
    let currentPlayList = localStorage.getItem("currentPlayList");
    currentPlayList = JSON.parse(currentPlayList);
    let fileURL =
      currentPlayList[0]["_document"].data.value.mapValue.fields.fileUrl
        .stringValue;
    setCurrentSong(fileURL);
    setPlayListLen(currentPlayList.length - 1);
  }

  React.useEffect(() => {
    setTimeout(() => setPlayList(), 2000);
  }, []);

  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [current, setCurrent] = useState(0);
  const [playListLen, setPlayListLen] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [autoP, setAutoP] = useState(false);

  const audioRef = useRef();

  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const onVolumeChange = (vol) => {
    setVolume(vol);
    const audio = audioRef.current;
    audio.volume = volume;
  };

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
      <audio
        autoPlay={autoP}
        ref={audioRef}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration.toFixed(2));
        }}
        src={currentSong}
      ></audio>
      <ControlPanel
        play={play}
        isPlaying={isPlaying}
        current={current}
        setCurrent={setCurrent}
        playListLen={playListLen}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        volume={volume}
        setAutoP={setAutoP}
      />
      <Slider
        percentage={percentage}
        onChange={onChange}
        duration={duration}
        currentTime={currentTime}
      />
      <VolumeControl volume={volume} setVolume={onVolumeChange} />
    </div>
  );
};

export default MusicPlayer;
