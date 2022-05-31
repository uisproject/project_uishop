import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart } from "../features/cart";

const CartScreen = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const qty = search.split("=")[1];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addToCart({ id, qty }));
  }, [dispatch, id, qty]);

  return <div>CartScreen</div>;
};

export default CartScreen;
