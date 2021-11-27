import React from "react";
import "./songs.css";

const SongItem = ({ song, index, play, isPlaying }) => {
  return (
    <div className="songListItem">
      <div className="firstItemListItem lock">
        <h4 className="listItemTexth4 icon-unlock">{index + 1}</h4>
        <div className="btn-container-play icon-lock">
          <div
            onClick={play}
            className={isPlaying ? "btn-stop-list-item" : "btn-play-list-item"}
          ></div>
        </div>
      </div>
      <div className="secondItemListItem">
        <img className="coverListItem" src={song.songCover} alt=""></img>
        <h4 className="listItemTexth4">{song.songName}</h4>
      </div>
      <div className="thirdItemListItem">
        <h4 className="listItemTexth4">{song.artistName}</h4>
      </div>
      <div className="forthItemListItem">
        <h4 className="listItemTexth4gray">{song.album}</h4>
      </div>
      <div className="fifthItemListItem">
        <div></div>
      </div>
    </div>
  );
};

export default SongItem;
