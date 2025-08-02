import Modal from "react-bootstrap/Modal";
import SetTime from "./SetTime";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddToDoModal from "./AddToDoModal";

const user = JSON.parse(localStorage.getItem("user"));

function MyVerticallyCenteredModal({ show, onHide, activeDay }) {
  const [modalShow, setModalShow] = useState(false);

  const handleShow = (day) => {
    setModalShow(true);
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>To-Do List For {activeDay || "Modal heading"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <Button className="p-4" onClick={() => handleShow()}>
          <FaPlus className="fs-3" />
        </Button>

        <AddToDoModal show={modalShow} onHide={() => setModalShow(false)} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
