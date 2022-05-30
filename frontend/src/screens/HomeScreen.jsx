import React, { useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getProductList } from "../features/product";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const productList = useSelector(({ productList }) => productList);
  const { isLoading, error, products } = productList;

  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    if (ref.current === true) return;

    ref.current = true;

    // do something
    dispatch(getProductList());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Product</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Row>
          {products.map((product, idx) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product {...product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
