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

const RightSideCart = () => {
  const { cart, getCart, deleteMerchInCart } = useContext(storeContext);
  let navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  function handleBuy() {
    navigate("/payment");
  }

  function handleDeleteMerch(e, merch) {
    e.preventDefault();
    deleteMerchInCart(merch);
    getCart();
  }

  return (
    <div className="rightSideCart">
      <div className="cartNavbar">
        <h3 className="cartPageHeaderText">Cart</h3>
        <Link to="/store/all" style={{ textDecoration: "none" }}>
          <div className="l-t">
            <ProductionQuantityLimitsIcon
              sx={{ fontSize: "34px" }}
              className="leftListIcons"
            />
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
              {cart
                ? cart.merch.map((item) => (
                    <TableRow TableRow key={item.merch.id} sx={{}}>
                      <TableCell
                        sx={{ color: "white", fontSize: "15px" }}
                        component="th"
                        scope="row"
                      >
                        {item.merch.title}
                      </TableCell>
                      <TableCell align="center">
                        <img width="50" src={item.merch.imageURL} alt="" />
                      </TableCell>

                      <TableCell
                        sx={{ color: "white", fontSize: "15px" }}
                        align="right"
                      >
                        {item.merch.price}
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", fontSize: "15px" }}
                        align="right"
                      >
                        {item.merch.category}
                      </TableCell>
                      <TableCell align="center">
                        <HighlightOffIcon
                          sx={{ color: "white", width: "30px" }}
                          variant="contained"
                          onClick={(e) => handleDeleteMerch(e, item.merch)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : null}
              <TableRow>
                <TableCell
                  sx={{
                    color: "white",
                    fontSize: "20px",
                    marginLeft: "100px",
                  }}
                  colSpan={3}
                  align="right"
                >
                  Total:{" "}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontSize: "20px" }}
                  colSpan={1}
                  align="right"
                >
                  {cart ? cart.totalPrice : 0} сом
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="buyBtnCartPage">
        {cart ? (
          cart.totalPrice !== 0 ? (
            <Button
              variant="contained"
              onClick={() => handleBuy()}
              sx={{ fontSize: "18px" }}
            >
              Buy
            </Button>
          ) : (
            <Button disabled variant="contained" sx={{ fontSize: "18px" }}>
              Buy
            </Button>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default RightSideCart;
