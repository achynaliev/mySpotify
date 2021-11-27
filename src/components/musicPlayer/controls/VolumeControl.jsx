import React, { useState } from "react";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./control-panel.css";

const VolumeControl = ({ volume, onVolumeChange }) => {
  function updateVolume(e) {
    onVolumeChange(e.target.value);
    setVolumeLVL(e.target.value);
  }

  const [mute, setMute] = useState(false);
  const [volumeLVL, setVolumeLVL] = useState(volume);

  const setMuteUnmute = () => {
    if (mute) {
      setMute(false);
      onVolumeChange(volumeLVL);
    } else {
      setMute(true);
      onVolumeChange(0);
    }
  };

  let muteBtn;
  if (mute) {
    muteBtn = (
      <VolumeUpIcon
        onClick={() => {
          setMuteUnmute();
        }}
        sx={{ marginLeft: "12px", marginTop: "4px" }}
      />
    );
  } else {
    muteBtn = (
      <VolumeOffIcon
        onClick={() => {
          setMuteUnmute();
        }}
        sx={{ marginLeft: "12px", marginTop: "4px" }}
      />
    );
  }

  return (
    <div className="volume-container">
      <i className="fa fa-volume-up" aria-hidden="true" />
      <input
        className="volume"
        type="range"
        min={0.0}
        max={1.0}
        step={0.01}
        value={volume}
        onChange={(e) => updateVolume(e)}
      />
      {muteBtn}
    </div>
  );
};

export default VolumeControl;
