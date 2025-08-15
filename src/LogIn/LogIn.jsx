import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SetUpComponent from "./SetUp";
import Background from "../UniComp/Background";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user info safely
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin(); // This can update isLoggedIn state or redirect, etc.
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center  mt-auto p-2"
      style={{
        minHeight: "100vh",
      }}>
      <Background />
      <Form
        onSubmit={handleLogin}
        className="align-self-center rounded-5 p-5 w-25"
        style={{ backgroundColor: "#7f7e7e5d", backdropFilter: "blur(10px)" }}>
        <Row>
          <h3 className="mb-4">Log In</h3>
        </Row>
        <Row className="">
          <Form.Group className="mb-3">
            <Form.Control
              className=""
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              className=""
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Button type="submit" className="btn-1 self-center">
            <span>Login</span>
          </Button>
          <label style={{ color: "white" }} className="">
            Dont have an account? <Link to="/Setup">Sign Up</Link>
          </label>
        </Row>
      </Form>
    </div>
  );
}

export default LoginPage;
