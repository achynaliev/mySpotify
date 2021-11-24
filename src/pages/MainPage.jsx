import React, { useEffect } from "react";
import { fireDB, storage } from "../base.js";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { collection, getDocs, addDoc, doc } from "firebase/firestore";

const MainPage = () => {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [users, setUsers] = React.useState([]);

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
    const songTitle = e.target.songTitle.value;
    if (!songTitle || !fileUrl) {
      return;
    }
    try {
      await addDoc(collection(fireDB, "music"), {
        songTitle: songTitle,
        fileUrl: fileUrl,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  };

  useEffect(() => {
    const fetchMusic = async () => {
      const musicDocumentRef = collection(fireDB, "music");
      const musicCollection = await getDocs(musicDocumentRef);
      console.log(musicCollection.docs);
      setUsers(
        musicCollection.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchMusic();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <input type="text" name="songTitle" placeholder="Title" />
        <button>Submit</button>
      </form>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.songTitle}>
              <audio controls autoPlay name="media">
                <source src={user.fileUrl} type="audio/mpeg" />
              </audio>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MainPage;
