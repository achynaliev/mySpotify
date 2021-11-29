import React from "react";
import Button from "./Button";
import "./control-panel.css";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";

function ControlPanel({
  play,
  isPlaying,
  playNext,
  playPrev,
  current,
  repeat,
  setRepeat,
}) {
  let rep;
  if (repeat) {
    rep = { fontSize: "18px", marginLeft: "15px", color: "#4caf50" };
  } else {
    rep = { fontSize: "18px", marginLeft: "15px" };
  }

  const handleRepeat = () => {
    if (repeat) {
      setRepeat(false);
    } else {
      setRepeat(true);
    }
  };

  return (
    <div className="control-panel">
      <ShuffleIcon sx={{ fontSize: "18px", marginRight: "15px" }} />
      <SkipPreviousIcon sx={{ fontSize: "34px" }} onClick={(e) => playPrev()}>
        prev
      </SkipPreviousIcon>
      <Button play={play} isPlaying={isPlaying} current={current} />
      <SkipNextIcon sx={{ fontSize: "34px" }} onClick={(e) => playNext()}>
        next
      </SkipNextIcon>
      <RepeatIcon onClick={() => handleRepeat()} sx={rep} />
    </div>
  );
}
export default ControlPanel;
