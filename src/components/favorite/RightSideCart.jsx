import React, { useContext, useEffect, useState } from "react";
import "./cartMainPage.css";
import { storeContext } from "../../contexts/StoreContext";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import StarIcon from "@mui/icons-material/Star";

const RightSideFavorite = () => {
  const {
    favorites,
    getFavorite,
    addAndDeleteProductInFavorites,
    addAndDeleteMerchInCart,
  } = useContext(storeContext);
  let navigate = useNavigate();

  useEffect(() => {
    getFavorite();
  }, []);

  function handleBuy() {
    navigate("/payment");
  }

  function handleDeleteMerch(e, item) {
    e.preventDefault();
    addAndDeleteProductInFavorites(item);
    addAndDeleteMerchInCart(item);
    getFavorite();
  }

  return (
    <div className="rightSideCart">
      <div className="cartNavbar">
        <h3 className="cartPageHeaderText">Favorite</h3>
        <Link to="/store/all" style={{ textDecoration: "none" }}>
          <div className="l-t">
            <StarIcon sx={{ fontSize: "34px" }} className="leftListIcons" />
          </div>
        </Link>
      </div>
      <div className="hz">
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 620,
              bgcolor: "rgb(45, 46, 46)",
              color: "white",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white", fontSize: "20px" }}>
                  Title
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontSize: "20px" }}
                  align="center"
                >
                  Image
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontSize: "20px" }}
                  align="right"
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontSize: "20px" }}
                  align="right"
                >
                  Category
                </TableCell>

                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {favorites
                ? favorites.favorites.map((item) => (
                    <TableRow TableRow key={item.item.id} sx={{}}>
                      <TableCell
                        sx={{ color: "white", fontSize: "15px" }}
                        component="th"
                        scope="row"
                      >
                        {item.item.title}
                      </TableCell>
                      <TableCell align="center">
                        <img width="50" src={item.item.imageURL} alt="" />
                      </TableCell>

                      <TableCell
                        sx={{ color: "white", fontSize: "15px" }}
                        align="right"
                      >
                        {item.item.price}
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", fontSize: "15px" }}
                        align="right"
                      >
                        {item.item.category}
                      </TableCell>
                      <TableCell align="center">
                        <ProductionQuantityLimitsIcon
                          sx={{ color: "white", width: "30px" }}
                          variant="contained"
                          onClick={(e) => handleDeleteMerch(e, item.item)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RightSideFavorite;
