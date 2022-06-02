import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../features/userDetail";
import { updateProfile } from "../features/updateProfile";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";

const ProfileScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const { userDetail } = useSelector(({ userDetail }) => userDetail);
  const { isLoading, error, updatedUserData } = useSelector(
    ({ userDetail }) => userDetail
  );

  useEffect(() => {
    dispatch(getUserDetail());
  }, [dispatch]);

  useEffect(() => {
    setName(userDetail.name);
    setEmail(userDetail.email);
  }, [userDetail]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return setMessage("Password doesn't match");

    dispatch(updateProfile({ name, email, password }));
  };

  return (
    <FormContainer>
      <h1>User Profile</h1>
      {error && <Message variant={"danger"}>{error}</Message>}
      {message && <Message variant={"danger"}>{message}</Message>}

      {isLoading ? (
        <Loader />
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update Profile
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default ProfileScreen;
