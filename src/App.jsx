import { useState, useEffect } from "react";
import CardComponent from "./MainComponents/Card";
import NewsCardComponent from "./MainComponents/NewsCard";
import NavbarComponent from "./MainComponents/Navbar";
import ToDoCardComponent from "./MainComponents/ToDoCard";
import { Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "./MainComponents/TodoModal";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SetUpComponent from "./LogIn/SetUp";
import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import LoginPage from "./LogIn/LogIn";
import Calendar from "./MainComponents/Calendar";

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
        <Row
          className="justify-content-center mb-5"
          style={{ minHeight: "30vh" }}>
          <h4
            className="mb-0 text-center font-bold"
            style={{ color: "#ffffffe5" }}>
            To-Do
          </h4>
          <Col className=" mx-0">
            <Calendar className="h-100 w-100" />
            {/*<ToDoCardComponent />*/}
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
