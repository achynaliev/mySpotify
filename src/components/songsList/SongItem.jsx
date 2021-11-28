import React from "react";
import "./songs.css";
import { playerContext } from "../../contexts/PlayerContext";

const SongItem = ({ songg, index }) => {
  const { song, selectASong } = React.useContext(playerContext);

  const play = () => {
    if (song.isPlaying) {
      if (song.index === index) {
        selectASong(index, false);
      } else {
        selectASong(index, true);
      }
    } else {
      selectASong(index, true);
    }
  };

  let playPause;
  if (song.index === index && song.isPlaying) {
    playPause = (
      <div className="firstItemListItem lock">
        <iframe
          src="https://giphy.com/embed/8L0Pbbkno5BI8n4CaI"
          width="15px"
          height="18px"
          style={{ marginRight: "-10px" }}
          frameBorder="0"
          className="giphy-embed listItemTexth4 icon-unlock"
          title="equlizer"
        ></iframe>
        <div className="btn-container-play icon-lock">
          <div onClick={play} className="btn-stop-list-item"></div>
        </div>
      </div>
    );
  } else {
    playPause = (
      <div className="firstItemListItem lock">
        <h4 className="listItemTexth4 icon-unlock">{index + 1}</h4>
        <div className="btn-container-play icon-lock">
          <div onClick={play} className="btn-play-list-item"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="songListItem">
      {playPause}
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
