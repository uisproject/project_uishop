import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const ref = useRef();

  const getProducts = async () => {
    const { data } = await axios.get("/api/products");

    setProducts(data);
  };

  useEffect(() => {
    if (ref.current === true) return;

    ref.current = true;

    // do something
    getProducts();
  }, []);

  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product, idx) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
