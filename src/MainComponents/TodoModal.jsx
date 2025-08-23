import Modal from "react-bootstrap/Modal";
import SetTime from "../UniComp/SetTime";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddToDoModal from "./AddToDoModal";

function MyVerticallyCenteredModal({ show, onHide, activeDay }) {
  const [modalShow, setModalShow] = useState(false);
  const [todos, setTodos] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const todoId = user?.todo || [];

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

  const handleDelete = async (todoId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      const response = await fetch(
        `http://localhost:8000/api/users/${userId}/todo/${todoId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete task");

      const updatedUser = await response.json();
      console.log("Updated user:", updatedUser);

      // refresh todos in UI
      await fetchTodos();
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <Modal.Title className="mb-0">
            To-Do List For {activeDay || "Modal heading"}
          </Modal.Title>
          {todos.some((todo) => todo.date === activeDay) ? (
            <Button variant="primary" onClick={handleShow}>
              <FaPlus />
            </Button>
          ) : null}
        </div>
      </Modal.Header>
      <Modal.Body
        className="d-flex justify-content-center"
        style={{ maxHeight: "400px", overflowY: "auto", width: "100%" }}>
        {todos.some((todo) => todo.date === activeDay) ? (
          <div style={{ width: "100%" }}>
            {todos
              .filter((todo) => todo.date === activeDay)
              .map((todo, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: "solid",
                    borderTop: "solid",
                    marginTop: "10px",
                    backgroundColor: "#5d98b1ff",
                    borderRadius: "10px",
                    padding: "5px",
                  }}>
                  <div className="d-flex justify-content-start mt-4 mb-0">
                    <div className="d-flex justify-content-center mx-2">
                      <span className="fw-bold">From - </span>
                      <p>{todo.Fromtime}</p>
                    </div>
                    <div className="d-flex justify-content-center mx-2">
                      <span className="fw-bold">To - </span>
                      <p>{todo.Totime}</p>
                    </div>
                    <div className="ms-auto">
                      <button
                        className="text-end"
                        onClick={() => handleDelete(todo._id)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          color: "red",
                        }}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="fw-bold mx-2 mt-0">Task</span>
                  <div
                    style={{
                      minHeight: "10vh",
                      minWidth: "25vw",
                      border: "solid",
                      borderRadius: "10px",
                    }}
                    className="mb-4">
                    <p className="mx-2">{todo.task}</p>
                  </div>
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
          fetchTodos={fetchTodos}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
