import Modal from "react-bootstrap/Modal";
import SetTime from "./SetTime";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddToDoModal from "./AddToDoModal";

const user = JSON.parse(localStorage.getItem("user"));

function MyVerticallyCenteredModal({ show, onHide, activeDay }) {
  const [modalShow, setModalShow] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleShow = (day) => {
    setModalShow(true);
  };

  const fetchTodos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `http://localhost:8000/api/users/${user.id}/todo`
      );
      const data = await res.json();
      console.log("Fetched todos:", data);
      setTodos(data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos(); // Only runs once
  }, []);

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <Modal.Title className="mb-0">
            To-Do List For {activeDay || "Modal heading"}
          </Modal.Title>
          <Button variant="primary" onClick={handleShow}>
            <FaPlus />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        {todos.some((todo) => todo.date === activeDay) ? (
          <div>
            {todos
              .filter((todo) => todo.date === activeDay)
              .map((todo, i) => (
                <div key={i}>
                  {todo.time} - {todo.task}
                </div>
              ))}
          </div>
        ) : (
          <Button className="p-4" onClick={() => handleShow()}>
            <FaPlus className="fs-3" />
          </Button>
        )}

        <AddToDoModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          todaydate={activeDay}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
