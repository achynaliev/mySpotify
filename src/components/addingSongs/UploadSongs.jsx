import React from "react";
import { fireDB, storage } from "../../base";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import "./uploadPage.css";

const UploadSongs = () => {
  const [fileUrl, setFileUrl] = React.useState(null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const fileRef = ref(storage, "music/" + file.name);
    await uploadBytes(fileRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    getDownloadURL(fileRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        setFileUrl(url);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const songName = e.target.songName.value;
    const artistName = e.target.artistName.value;
    const album = e.target.album.value;
    const songCover = e.target.songCover.value;
    const genre = e.target.songCover.value;
    if (!songName || !fileUrl || !artistName || !album || !songCover) {
      return;
    }
    try {
      await addDoc(collection(fireDB, "music"), {
        songName,
        artistName,
        album,
        songCover,
        fileUrl,
        genre,
      });
      localStorage.setItem("currentPlayList", "null");
    } catch (error) {
      console.error("Error creating user document", error);
    }
  };
  return (
    <div className="mainSongUploadCont">
      <form className="uploadForm" onSubmit={onSubmit}>
        <input type="text" name="songName" placeholder="name of the song" />
        <input
          type="text"
          name="artistName"
          placeholder="name of the artists"
        />
        <input type="text" name="album" placeholder="name of the album" />
        <input type="text" name="songCover" placeholder="image for the song" />
        <select id="category" name="genre">
          <option value="hip-hop">hip-hop</option>
          <option value="rap">rap</option>
          <option value="scarf">pop</option>
          <option value="scarf">rock</option>
          <option value="scarf">russian</option>
          <option value="scarf">kyrgyz</option>
        </select>
        <input type="file" onChange={onFileChange} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UploadSongs;
