import React from "react";
import CreditCardPage from "./CreditCardPage";
import "./CreditCardForm.css";

const CreditMainPage = () => {
  return (
    <>
      <div className="credit-main-page">
        <div className="ccp">
          <CreditCardPage />
        </div>
      </div>
    </>
  );
};

export default CreditMainPage;
