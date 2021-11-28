import React from "react";
import "./songs.css";
import { playerContext } from "../../contexts/PlayerContext";

const SongItem = ({ songg, index }) => {
  const { song, selectASong } = React.useContext(playerContext);

  const play = () => {
    if (song.isPlaying) {
      selectASong(index, false);
    } else {
      selectASong(index, true);
    }
  };

  return (
    <div className="songListItem">
      <div className="firstItemListItem lock">
        <h4 className="listItemTexth4 icon-unlock">{index + 1}</h4>
        <div className="btn-container-play icon-lock">
          <div
            onClick={play}
            className={
              song.isPlaying && song.index === index
                ? "btn-stop-list-item"
                : "btn-play-list-item"
            }
          ></div>
        </div>
      </div>
      <div className="secondItemListItem">
        <img className="coverListItem" src={songg.songCover} alt=""></img>
        <h4 className="listItemTexth4">{songg.songName}</h4>
      </div>
      <div className="thirdItemListItem">
        <h4 className="listItemTexth4">{songg.artistName}</h4>
      </div>
      <div className="forthItemListItem">
        <h4 className="listItemTexth4gray">{songg.album}</h4>
      </div>
      <div className="fifthItemListItem">
        <div></div>
      </div>
    </div>
  );
};

export default SongItem;
