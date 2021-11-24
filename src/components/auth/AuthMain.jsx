import React, { useState } from "react";
import authBGimage from "../../images/authPageIMG.png";
import { Button } from "@mui/material";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import "./authpage.css";

const AuthMain = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  return (
    <div className="authMain">
      <div className="authIMGdiv">
        <img className="authBGimg" src={authBGimage} alt="" />
      </div>
      <div className="authMainRight">
        <h1>Welcome</h1>
        <Button onClick={handleShow}>Sign Up</Button>
        <Button onClick={handleShowLogin}>Sing In</Button>
      </div>
      <SignUpModal handleClose={handleClose} show={show} />
      <SignInModal handleCloseLogin={handleCloseLogin} showLogin={showLogin} />
    </div>
  );
};

export default AuthMain;
