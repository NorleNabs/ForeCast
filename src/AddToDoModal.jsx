import Modal from "react-bootstrap/Modal";
import SetTime from "./SetTime";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const user = JSON.parse(localStorage.getItem("user"));

function AddToDoModal({ show, onHide }) {
  const [selectedHour, setSelectedHour] = useState("01");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("AM");

  const handleSave = () => {
    const fullTime = `${selectedHour}:${selectedMinute} ${selectedTimeFrame}`;
    console.log("Selected Time:", fullTime);
    // Save logic here
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SetTime
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
          selectedMinute={selectedMinute}
          setSelectedMinute={setSelectedMinute}
          selectedTimeFrame={selectedTimeFrame}
          setSelectedTimeFrame={setSelectedTimeFrame}
        />
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add Your Task Here"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddToDoModal;
