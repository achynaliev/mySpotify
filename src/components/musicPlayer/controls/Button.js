import React from "react";
import "./button.css";
import { playerContext } from "../../../contexts/PlayerContext";

function Button({ isPlaying, current }) {
  const { selectASong } = React.useContext(playerContext);

  const handleUpdateIsPlaying = () => {
    if (isPlaying) {
      selectASong(current, false);
    } else {
      selectASong(current, true);
    }
  };
  return (
    <div className="btn-container">
      <div
        onClick={handleUpdateIsPlaying}
        className={isPlaying ? "btn-stop" : "btn-play"}
      ></div>
    </div>
  );
}
export default Button;
