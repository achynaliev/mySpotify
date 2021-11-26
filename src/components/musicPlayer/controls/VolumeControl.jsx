import React from "react";
import "./control-panel.css";

const VolumeControl = ({ volume, setVolume }) => {
  function updateVolume(e) {
    setVolume(e.target.value);
  }

  return (
    <div className="volume-container">
      <i className="fa fa-volume-up" aria-hidden="true" />
      <input
        className="volume"
        type="range"
        min={0}
        max={1.0}
        step={0.01}
        value={volume}
        onChange={(e) => updateVolume(e)}
      />
    </div>
  );
};

export default VolumeControl;
