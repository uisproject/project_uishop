import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ _id, image, name, rating, numReviews, price }) => {
  return (
    <Card>
      <Link to={`/product/${_id}`}>
        <a href={`/product/${_id}`}>
          <Card.Img src={image} variant="top" />
        </a>
      </Link>

      <Card.Body>
        <a href={`/product/${_id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </a>

        <Card.Text as="div">
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
