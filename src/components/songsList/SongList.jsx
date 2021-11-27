import React, { useEffect } from "react";
import { fireDB } from "../../base.js";
import { collection, getDocs } from "firebase/firestore";
import SongItem from "./SongItem";
import "./songs.css";

const SongList = () => {
  const [songs, setSongList] = React.useState([]);

  useEffect(() => {
    const fetchMusic = async () => {
      const musicDocumentRef = collection(fireDB, "music");
      const musicCollection = await getDocs(musicDocumentRef);
      let currentPlayList = localStorage.getItem("currentPlayList");
      if (currentPlayList === null || currentPlayList === "null") {
        localStorage.setItem(
          "currentPlayList",
          JSON.stringify(musicCollection.docs)
        );
      }
      setSongList(
        musicCollection.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchMusic();
  }, []);

  return (
    <>
      <div className="songListCont">
        <div className="songListHeader">
          <div className="firstItemListItem">
            <h4 className="listItemTexth4gray">#</h4>
          </div>
          <div className="secondItemListItem">
            <h4 className="listItemTexth4gray">Title</h4>
          </div>
          <div className="thirdItemListItem">
            <h4 className="listItemTexth4gray">Artists</h4>
          </div>
          <div className="forthItemListItem">
            <h4 className="listItemTexth4gray">Album</h4>
          </div>
          <div className="fifthItemListItem">
            <h4 className="listItemTexth4gray">_</h4>
          </div>
        </div>
        <div className="listItemsCont">
          {songs.map((song, index) => {
            return <SongItem key={index} song={song} index={index}></SongItem>;
          })}
        </div>
      </div>
    </>
  );
};

export default SongList;
