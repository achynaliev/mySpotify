import React from "react";
import Button from "./Button";
import "./control-panel.css";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

function ControlPanel({ play, isPlaying, playNext, playPrev, current }) {
  return (
    <div className="control-panel">
      <SkipPreviousIcon sx={{ fontSize: "40px" }} onClick={(e) => playPrev()}>
        prev
      </SkipPreviousIcon>
      <Button play={play} isPlaying={isPlaying} current={current} />
      <SkipNextIcon sx={{ fontSize: "40px" }} onClick={(e) => playNext()}>
        next
      </SkipNextIcon>
    </div>
  );
}
export default ControlPanel;
