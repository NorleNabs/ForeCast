import Modal from "react-bootstrap/Modal";
import React from "react";
import { Button } from "react-bootstrap";

function MyVerticallyCenteredModal({ show, onHide, activeDay }) {
  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>To-Do List For {activeDay || "Modal heading"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Weather for {activeDay}</h4>
        <p>This is the dynamic content for {activeDay}.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
