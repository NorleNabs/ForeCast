import { Button, Container } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

function ToDoCardComponent() {
  return (
    <Container className="d-flex justify-content-center w-100 h-100">
      <Stack
        direction="horizontal"
        gap={3}
        className="w-100 justify-content-center align-items-center p-3">
        <div className="bg-primary h-100 w-100 m-2 rounded-3">Box 1</div>
        <div className="bg-primary h-100 w-100 m-2 rounded-3">Box 2</div>
        <div className="bg-primary h-100 w-100 m-2 rounded-3">Box 3</div>
        <div className="bg-primary h-100 w-100 m-2 rounded-3">Box 4</div>
        <div className="bg-primary h-100 w-100 m-2 rounded-3">Box 5</div>
        <div className="bg-primary h-100 w-100 m-2 rounded-3">Box 6</div>
        <div className="bg-primary h-100 w-100 m-2 rounded-3">Box 7</div>
      </Stack>
    </Container>
  );
}

export default ToDoCardComponent;
