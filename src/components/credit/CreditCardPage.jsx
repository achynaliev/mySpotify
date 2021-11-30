import React, { useContext } from "react";
import { Button } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import useForm from "./useForm";
import { Form, Alert } from "react-bootstrap";
import Badge from "@mui/material/Badge";

//import "bootstrap/dist/css/bootstrap.min.css";
import "./CreditCardForm.css";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useNavigate } from "react-router";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { storeContext } from "../../contexts/StoreContext";

const CreditCardPage = () => {
  const { handleChange, handleFocus, handleSubmit, values, errors } = useForm();
  let navigate = useNavigate();
  const { merchCountInCart } = useContext(storeContext);

  if (errors.message === "Payment was successful!") {
    setTimeout(() => navigate("/store/all"), 3500);
  }

  return (
    <div>
      <div className="creditCardPageNavbar">
        <h2 className="creditHeaderText">Complete your purchase</h2>
        <Link to="/cart">
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            sx={{ paddingTop: "20px" }}
          >
            <Badge badgeContent={merchCountInCart} color="error">
              <ShoppingCart sx={{ fontSize: 28, color: "white" }} />
            </Badge>
          </IconButton>
        </Link>
      </div>
      <div className="creditCardMainDiv" style={{ bgcolor: "white" }}>
        <div className="box justify-content-center align-items-center">
          <div className="formDiv">
            <div className="creditCard">
              <Cards
                cvc={values.cardSecurityCode}
                expiry={values.cardExpiration}
                name={values.cardName}
                number={values.cardNumber}
              />
            </div>
            <div className="card-inputs">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="rowrowrow">
                  <Form.Control
                    type="text"
                    id="cardName"
                    data-testid="cardName"
                    name="cardName"
                    placeholder="Cardholder Name"
                    value={values.cardName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.cname}
                  />
                </Form.Group>
                <Form.Group className="rowrowrow">
                  <Form.Control
                    type="number"
                    id="cardNumber"
                    data-testid="cardNumber"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={values.cardNumber}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.cnumber}
                  />
                </Form.Group>
                <Form.Group className="rowrowrow">
                  <Form.Control
                    type="text"
                    id="cardExpiration"
                    data-testid="cardExpiration"
                    name="cardExpiration"
                    placeholder="Expiration Date"
                    value={values.cardExpiration}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.cexp}
                  />
                </Form.Group>
                <Form.Group className="rowrowrow">
                  <Form.Control
                    type="number"
                    id="cardSecurityCode"
                    data-testid="cardSecurityCode"
                    name="cardSecurityCode"
                    placeholder="Security Code"
                    value={values.cardSecurityCode}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.ccvv}
                  />
                </Form.Group>

                <div className="btn-pay">
                  <Button
                    variant="contained"
                    size={"block"}
                    data-testid="validateButton"
                    id="validateButton"
                    type="submit"
                  >
                    Pay
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          <div className="alert">
            <Alert
              className="alertText"
              id="alertMessage"
              data-testid="alertMessage"
              variant={errors.variant}
              show={errors.show}
            >
              {errors.message}
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardPage;
