import React, { useEffect, useReducer } from "react";
//import axios from "axios";
import { auth, fireDB } from "../base";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const authContext = React.createContext();

const INIT_STATE = {
  user: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "LOGOUT_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        dispatch({
          type: "LOGIN_USER",
          payload: user,
        });
        // ...
      } else {
        dispatch({
          type: "LOGOUT_USER",
          payload: null,
        });
        // User is signed out
        // ...
      }
    });
  }, []);

  const createUserWithEmailAndPasswordHandler = async (
    email,
    password,
    username,
    imageURL
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("uid", user.uid);
      generateUserDocument(user, {
        username,
        imageURL,
        likedSongs: [],
        addedSongs: [],
        playlists: [],
        albums: [],
      });
    } catch (error) {
      console.log(error);
      //setError("Error Signing up with email and password");
    }
  };

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        //sign out successfully
        dispatch({
          type: "LOGOUT_USER",
          payload: null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginUserWithEmail = async (email, password) => {
    try {
      let results = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("uid", results.user.uid);
      getUserDocument(results.user.uid);
    } catch (e) {
      console.log(e);
    }
  };

  const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    console.log(user, additionalData);

    const userRef = doc(fireDB, "users", `${user.uid}`);
    const querySnapshot = await getDoc(userRef);
    if (!querySnapshot.exists()) {
      const { email } = user;
      try {
        await setDoc(doc(fireDB, "users", `${user.uid}`), {
          email,
          ...additionalData,
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };

  const getUserDocument = async (uid) => {
    if (!uid) return null;
    try {
      const userDocumentRef = doc(fireDB, "users", `${uid}`);
      const userDocument = await getDoc(userDocumentRef);

      localStorage.setItem(
        "userFields",
        JSON.stringify(userDocument._document.data.value.mapValue.fields)
      );
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

  return (
    <authContext.Provider
      value={{
        createUserWithEmailAndPasswordHandler,
        loginUserWithEmail,
        logOut,
        user: state.user,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
