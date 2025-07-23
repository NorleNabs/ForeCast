import { useState } from "react";
import CardComponent from "./Card";
import NewsCardComponent from "./NewsCard";
import NavbarComponent from "./Navbar";
import ToDoCardComponent from "./ToDoCard";
import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>
      <NavbarComponent />
      <Container
        className="mt-2 mb-4 mx-0"
        style={{ minWidth: "99vw", margin: "0 auto" }}>
        <Row
          className="row d-flex justify-content-center mx-0"
          style={{ minHeight: "50vh" }}
          gap={1}>
          <Col
            sm={4}
            className="justify-content-center align-items-center rounded-3 mx-0"
            style={{
              height: "370px",
            }}>
            <CardComponent />
          </Col>
          <Col
            sm={8}
            className="justify-content-center align-items-center rounded-3 mx-0"
            style={{
              height: "370px",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}>
            <NewsCardComponent />
          </Col>
        </Row>
      </Container>
      <Container className="mt-3">
        <Row className=" justify-content-center" style={{ minHeight: "20vh" }}>
          <Col className="d-flex justify-content-center align-items-center mx-0">
            <ToDoCardComponent />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
