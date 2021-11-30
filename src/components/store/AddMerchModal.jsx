import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./store.css";
import { storeContext } from "../../contexts/StoreContext";
import { useParams } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#16161D",
  border: "1px solid lightgrey",
  boxShadow: 24,
  p: 4,
};

const AddMerchModal = ({ handleClose, open }) => {
  const [myMerch, setMyMerch] = React.useState({
    title: "",
    imageURL: "",
    price: "",
    category: "t-shirt",
  });
  const params = useParams();

  function handleChange(e) {
    let tempMyMerch = { ...myMerch, [e.target.name]: e.target.value };
    setMyMerch(tempMyMerch);
  }
  const { createMerch } = React.useContext(storeContext);

  function handleSubmit(e) {
    e.preventDefault();
    let merch = {
      title: myMerch.title,
      imageURL: myMerch.imageURL,
      price: myMerch.price,
      category: myMerch.category,
    };
    createMerch(merch);
    handleClose();
  }

  return (
    <div className="addMerchModal">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form className="form">
              <label color="white">Title: </label>
              <input
                sx={{ bgcolor: "rgb(43, 43, 43)", color: "white" }}
                name="title"
                type="text"
                placeholder="add a title"
                onChange={(e) => handleChange(e)}
              />

              <label>Image: </label>
              <input
                name="imageURL"
                type="text"
                placeholder="add an image url"
                onChange={(e) => handleChange(e)}
              />

              <label>Price: </label>
              <input
                name="price"
                type="number"
                placeholder="add a price"
                onChange={(e) => handleChange(e)}
              />

              <label>Category: </label>
              <select
                id="category"
                name="category"
                onChange={(e) => handleChange(e)}
              >
                <option value="t-shirt">T-Shirt</option>
                <option value="cap">Cap</option>
              </select>
            </form>
            <div style={{ paddingTop: "15px" }}>
              <Button
                className="btnAddProduct"
                variant="contained"
                color="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Add Product
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AddMerchModal;
