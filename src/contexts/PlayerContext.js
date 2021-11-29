import React, { useReducer } from "react";
// import axios from "axios";
//import { APIlikes } from "../helpers/config";

export const playerContext = React.createContext();
const INIT_STATE = {
  song: { index: 0, isPlaying: null },
  searchRes: [],
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_A_SONG":
      return {
        ...state,
        song: action.payload,
      };
    case "SET_SEARCH_RESULT":
      return {
        ...state,
        searchRes: action.payload,
      };
    default:
      return state;
  }
};

const PlayerContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const selectASong = (songIndex, isPlaying) => {
    dispatch({
      type: "SET_A_SONG",
      payload: { index: songIndex, isPlaying },
    });
  };

  const searchQueryClear = () => {
    dispatch({
      type: "SET_SEARCH_RESULT",
      payload: [],
    });
    let currentPlayList = localStorage.getItem("mainPlayList");
    currentPlayList = JSON.parse(currentPlayList);
    if (currentPlayList) {
      localStorage.setItem("currentPlayList", JSON.stringify(currentPlayList));
      localStorage.setItem("mainPlayList", "");
    }
  };

  const searchQuery = (query) => {
    let currentPlayList = localStorage.getItem("currentPlayList");
    currentPlayList = JSON.parse(currentPlayList);
    let reg = new RegExp(query);
    let result = currentPlayList.filter((item, index) => {
      if (
        item["_document"].data.value.mapValue.fields.artistName.stringValue
          .toLowerCase()
          .match(reg) ||
        item["_document"].data.value.mapValue.fields.songName.stringValue
          .toLowerCase()
          .match(reg) ||
        item["_document"].data.value.mapValue.fields.album.stringValue
          .toLowerCase()
          .match(reg)
      ) {
        if (index === )
        return item;
      }
    });
    dispatch({
      type: "SET_SEARCH_RESULT",
      payload: result,
    });
    localStorage.setItem("currentPlayList", JSON.stringify(result));
    let main = localStorage.getItem("mainPlayList");
    if (main === "" || main === null) {
      localStorage.setItem("mainPlayList", JSON.stringify(currentPlayList));
    }
  };

  return (
    <playerContext.Provider
      value={{
        selectASong,
        searchQuery,
        searchQueryClear,
        song: state.song,
        searchRes: state.searchRes,
      }}
    >
      {props.children}
    </playerContext.Provider>
  );
};

export default PlayerContextProvider;
