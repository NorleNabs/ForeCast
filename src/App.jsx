import { useState, useEffect } from "react";
import CardComponent from "./Card";
import NewsCardComponent from "./NewsCard";
import NavbarComponent from "./Navbar";
import ToDoCardComponent from "./ToDoCard";
import { Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "./TodoModal";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SetUpComponent from "./SetUp";
import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import LoginPage from "./LogIn";
import Background from "./Background";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const Dashboard = () => (
    <>
      <Background />
      <NavbarComponent onLogout={handleLogout} />
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
            style={{ height: "370px" }}>
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
        <Row className="justify-content-center" style={{ minHeight: "20vh" }}>
          <h4
            className="mb-0 text-center font-bold"
            style={{ color: "#ffffffe5" }}>
            This Week's To-Do List
          </h4>
          <Col className="d-flex justify-content-center align-items-center mx-0">
            <ToDoCardComponent />
          </Col>
        </Row>
      </Container>
    </>
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage
                onLogin={() => {
                  localStorage.setItem("isLoggedIn", "true");
                  setIsLoggedIn(true);
                }}
              />
            )
          }
        />
        <Route path="/setup" element={<SetUpComponent />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        {/* Add a fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
