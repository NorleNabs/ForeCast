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
      <Container className="mt-5" style={{ minWidth: "100vw" }}>
        <Row
          className="row d-flex justify-content-center"
          style={{ minHeight: "50vh" }}>
          <Col
            sm={4}
            className="justify-content-center align-items-center mx-0">
            <CardComponent />
          </Col>
          <Col
            sm={8}
            className="justify-content-center align-items-center mx-0">
            <NewsCardComponent />
          </Col>
        </Row>
      </Container>
      <Container className="mt-3" style={{ minWidth: "100vw" }}>
        <Row
          className="d-flex justify-content-center mt-4"
          style={{ minHeight: "30vh" }}>
          <Col className="d-flex justify-content-center align-items-center mx-0">
            <ToDoCardComponent />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
