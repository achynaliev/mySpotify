import React, { useReducer } from "react";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

import { fireDB } from "../base";

export const commentsContext = React.createContext();
const INIT_STATE = {
  commentsForItem: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_COMMENTS":
      return { ...state, commentsForItem: action.payload };
    default:
      return state;
  }
};

const CommentContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const createAComment = async (comment, productId) => {
    try {
      await addDoc(collection(fireDB, "comments"), { comment, productId });
      getCommentsForItem(productId);
    } catch (e) {
      console.log(e);
    }
  };

  const getCommentsForItem = async (productId) => {
    try {
      const commentRef = collection(fireDB, "comments");
      const q = query(commentRef, where("productId", "==", productId));
      const commentsCollection = await getDocs(q);
      let listOfComment = commentsCollection.docs.map((doc) => {
        return [doc.id, doc.data()];
      });
      let action = {
        type: "GET_COMMENTS",
        payload: listOfComment,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <commentsContext.Provider
      value={{
        createAComment,
        getCommentsForItem,
        commentsForItem: state.commentsForItem,
      }}
    >
      {props.children}
    </commentsContext.Provider>
  );
};

export default CommentContextProvider;
