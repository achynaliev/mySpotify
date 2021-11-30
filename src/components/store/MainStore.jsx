import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AddMerchModal from "./AddMerchModal";
import MerchCardList from "./MerchCardList";
import { useParams } from "react-router";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { storeContext } from "../../contexts/StoreContext";
import StarIcon from "@mui/icons-material/Star";
import "./store.css";

const MainStore = () => {
  const [open, setOpen] = React.useState(false);
  const { merchCountInCart, productsCountInFavorites } =
    useContext(storeContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const params = useParams();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  function styleLine(myLoc) {
    if (params.category === myLoc) {
      return {
        textDecoration: "none",
        color: "white",
        borderBottomWidth: "1.5px",
        borderBottomColor: "white",
        borderBottomStyle: "solid",
      };
    } else {
      return { textDecoration: "none", color: "white" };
    }
  }

  function handlePageNext() {
    if (currentPage !== pageCount) {
      let pageN = currentPage + 1;
      setCurrentPage(pageN);
    }
  }

  function handlePagePrev() {
    if (currentPage !== 1) {
      let pageN = currentPage - 1;
      setCurrentPage(pageN);
    }
  }

  let admin = localStorage.getItem("userFields");
  admin = JSON.parse(admin);
  let addBtn;
  if (admin.admin.booleanValue === true) {
    addBtn = (
      <Button
        sx={{
          fontSize: 15,
          height: "32px",
          marginRight: "20px",
          marginTop: "12px",
        }}
        variant="contained"
        onClick={handleOpen}
      >
        Add
      </Button>
    );
  } else {
    addBtn = <div></div>;
  }
  return (
    <div className="mainStoreCont">
      <div className="merchNavbar">
        <h2 className="MerchHeaderText">Store</h2>
        <div className="m-n">
          {addBtn}
          <Link to="/favorite">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={productsCountInFavorites} color="error">
                <StarIcon sx={{ fontSize: 30, color: "white" }} />
              </Badge>
            </IconButton>
          </Link>
          <Link to="/cart">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={merchCountInCart} color="error">
                <ShoppingCart sx={{ fontSize: 28, color: "white" }} />
              </Badge>
            </IconButton>
          </Link>
          <AddMerchModal handleClose={handleClose} open={open} />
        </div>
      </div>

      <div className="categories">
        <a href="/store/all" style={styleLine("all")}>
          <h4> All </h4>
        </a>
        <a href="/store/t-shirt" style={styleLine("t-shirt")}>
          <h4>T-Shirt</h4>
        </a>
        <a href="/store/cap" style={styleLine("cap")}>
          <h4>Cap</h4>
        </a>
      </div>

      <div className="merchCard">
        <MerchCardList setPageCount={setPageCount} currentPage={currentPage} />
      </div>
      <div className="pagination">
        {currentPage === 1 ? (
          <Button
            disabled
            onClick={() => handlePagePrev()}
            sx={{ fontSize: 20 }}
          >
            prev
          </Button>
        ) : (
          <Button onClick={() => handlePagePrev()} sx={{ fontSize: 20 }}>
            prev
          </Button>
        )}
        {currentPage === pageCount ? (
          <Button
            disabled
            onClick={() => handlePageNext()}
            sx={{ fontSize: 20 }}
          >
            next
          </Button>
        ) : (
          <Button onClick={() => handlePageNext()} sx={{ fontSize: 20 }}>
            next
          </Button>
        )}
      </div>
    </div>
  );
};

export default MainStore;
