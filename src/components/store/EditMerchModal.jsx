import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./store.css";
import { storeContext } from "../../contexts/StoreContext";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 340,
  bgcolor: "#16161D",
  border: "1px solid lightgrey",
  boxShadow: 24,
  p: 4,
};

const EditMerchModal = ({ item, handleClose, open }) => {
  const { editSpecificMerch, deleteMerch, deleteMerchInCart } =
    React.useContext(storeContext);
  const [myMerch, setMyMerch] = React.useState({
    title: item.title,
    imageURL: item.imageURL,
    price: item.price,
    category: item.category,
  });
  const params = useParams();

  function handleChange(e) {
    let tempMyMerch = { ...myMerch, [e.target.name]: e.target.value };
    setMyMerch(tempMyMerch);
  }

  function handleSubmit(e) {
    e.preventDefault();
    deleteMerchInCart(item);
    editSpecificMerch(item.id, myMerch, params.category);
    handleClose();
  }

  function handleDelete(e) {
    e.preventDefault();
    deleteMerchInCart(item);
    deleteMerch(item.id, params.category);
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
                sx={{
                  bgcolor: "rgb(43, 43, 43)",
                  color: "white",
                }}
                name="title"
                type="text"
                value={myMerch.title}
                placeholder="add a title"
                onChange={(e) => handleChange(e)}
              />

              <label>Image: </label>
              <input
                name="image"
                type="text"
                value={myMerch.imageURL}
                placeholder="add an image url"
                onChange={(e) => handleChange(e)}
              />

              <label>Price: </label>
              <input
                name="price"
                type="number"
                value={myMerch.price}
                placeholder="add a price"
                onChange={(e) => handleChange(e)}
              />

              <label>Category: </label>
              <select
                id="category"
                name="category"
                value={myMerch.category}
                onChange={(e) => handleChange(e)}
              >
                <option value="t-shirt">T-Shirt</option>
                <option value="cap">Cap</option>
                <option value="scarf">Scarf</option>
              </select>
            </form>
            <div
              style={{
                paddingTop: "15px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                className="btnAddProduct"
                variant="contained"
                color="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Save changes
              </Button>
              <Button variant="contained" onClick={(e) => handleDelete(e)}>
                Delete
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default EditMerchModal;
