import React from "react";
import "./mainP.css";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { playerContext } from "../../contexts/PlayerContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  color: "white",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const RightSideBar = () => {
  const { searchQuery, searchQueryClear } = React.useContext(playerContext);

  function handleChageOnInput(e) {
    e.preventDefault();
    if (e.target.value.length > 1) {
      searchQuery(e.target.value);
    } else if (e.target.value.length === 0) {
      searchQueryClear();
    }
  }

  return (
    <div className="rightSideMainCont">
      <div className="inputSearch">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onChange={(e) => handleChageOnInput(e)}
            placeholder="Search in playlist"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </div>
    </div>
  );
};

export default RightSideBar;
