import React, { useEffect } from "react";
import { fireDB } from "../../base.js";
import { collection, getDocs } from "firebase/firestore";
import SongItem from "./SongItem";

const SongList = () => {
  const [songs, setSongList] = React.useState([]);

  useEffect(() => {
    const fetchMusic = async () => {
      const musicDocumentRef = collection(fireDB, "music");
      const musicCollection = await getDocs(musicDocumentRef);
      let currentPlayList = localStorage.getItem("currentPlayList");
      if (currentPlayList === null) {
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
        {songs.map((song, index) => {
          return <SongItem key={index} song={song}></SongItem>;
        })}
      </div>
    </>
  );
};

export default SongList;
