import Modal from "react-bootstrap/Modal";
import SetTime from "./SetTime";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

function AddToDoModal({ show, onHide, todaydate, fetchTodos }) {
  const [ToselectedHour, setToSelectedHour] = useState("12");
  const [ToselectedMinute, setToSelectedMinute] = useState("00");
  const [ToselectedTimeFrame, setToSelectedTimeFrame] = useState("PM");
  const [FromselectedHour, setFromSelectedHour] = useState("12");
  const [FromselectedMinute, setFromSelectedMinute] = useState("00");
  const [FromselectedTimeFrame, setFromSelectedTimeFrame] = useState("AM");
  const [date, setDate] = useState(todaydate);
  const [task, setTask] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSave = async () => {
    const TofullTime = `${ToselectedHour}:${ToselectedMinute} ${ToselectedTimeFrame}`;
    const FromfullTime = `${FromselectedHour}:${FromselectedMinute} ${FromselectedTimeFrame}`;
    const today = new Date().toLocaleDateString(); // or use a proper date input if needed
    const userId = user?.id;
    console.log(userId);

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${userId}/todo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: todaydate,
            Totime: TofullTime,
            Fromtime: FromfullTime,
            task: task,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add task");
      const updatedUser = await response.json();
      await fetchTodos();
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
          ToselectedHour={ToselectedHour}
          setToSelectedHour={setToSelectedHour}
          ToselectedMinute={ToselectedMinute}
          setToSelectedMinute={setToSelectedMinute}
          ToselectedTimeFrame={ToselectedTimeFrame}
          setToSelectedTimeFrame={setToSelectedTimeFrame}
          FromselectedHour={FromselectedHour}
          setFromSelectedHour={setFromSelectedHour}
          FromselectedMinute={FromselectedMinute}
          setFromSelectedMinute={setFromSelectedMinute}
          FromselectedTimeFrame={FromselectedTimeFrame}
          setFromSelectedTimeFrame={setFromSelectedTimeFrame}
          setModalDate={setDate}
          modalDate={date}
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
