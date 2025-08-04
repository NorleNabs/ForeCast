import Modal from "react-bootstrap/Modal";
import SetTime from "./SetTime";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const user = JSON.parse(localStorage.getItem("user"));

function AddToDoModal({ show, onHide, todaydate }) {
  const [selectedHour, setSelectedHour] = useState("01");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("AM");
  const [date, setDate] = useState(todaydate);
  const [task, setTask] = useState("");

  const handleSave = async () => {
    const fullTime = `${selectedHour}:${selectedMinute} ${selectedTimeFrame}`;
    const today = new Date().toLocaleDateString(); // or use a proper date input if needed
    const userId = user?.id;

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${userId}/todo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: todaydate, time: fullTime, task: task }),
        }
      );

      if (!response.ok) throw new Error("Failed to add task");
      const updatedUser = await response.json();
      console.log("Updated user:", updatedUser);
      onHide(); // Close modal
    } catch (err) {
      console.error("Error saving task:", err.message);
    }
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
            value={task}
            onChange={(e) => setTask(e.target.value)}
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
