import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../features/user";

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(({ user }) => user);

  const logoutHandler = () => {
    dispatch(logoutRequest());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>UISHOP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <i className="fas fa-shopping-cart">Cart</i>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={"/login"}>
                  <Nav.Link href="/login">
                    <i className="fas fa-user">Sign In</i>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
