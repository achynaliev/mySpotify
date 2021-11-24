import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { authContext } from "../../contexts/AuthContext";

const SignInModal = (props) => {
  let navigate = useNavigate();

  const { loginUserWithEmail } = useContext(authContext);
  const [user, setUser] = useState({ email: "", password: "" });

  function handleChange(e) {
    let userr = { ...user, [e.target.name]: e.target.value };
    setUser(userr);
  }

  function handleLogIn(e) {
    try {
      e.preventDefault();
      loginUserWithEmail(user.email, user.password);
      props.handleCloseLogin();
      navigate("/")

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Modal
        show={props.showLogin}
        onHide={props.handleCloseLogin}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In to Tweeter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Enter user name"
              />
              <Form.Text className="text-muted">
                We'll never share your user name with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignInModal;
