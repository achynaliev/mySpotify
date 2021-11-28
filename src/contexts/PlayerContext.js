import React, { useReducer } from "react";
// import axios from "axios";
//import { APIlikes } from "../helpers/config";

export const playerContext = React.createContext();
const INIT_STATE = {
  song: { index: 0, isPlaying: null },
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_A_SONG":
      return {
        ...state,
        song: action.payload,
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

  return (
    <playerContext.Provider value={{ selectASong, song: state.song }}>
      {props.children}
    </playerContext.Provider>
  );
};

export default PlayerContextProvider;
