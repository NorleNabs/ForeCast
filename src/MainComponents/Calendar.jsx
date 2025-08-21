import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import MyVerticallyCenteredModal from "./TodoModal";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export default function Calendar() {
  const [modalShow, setModalShow] = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
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

    fetchTodos();
  }, []);

  const date = new Date();

  const formatted = date.toISOString().split("T")[0];

  const handleDateClick = (arg) => {
    {
      formatted <= arg.dateStr ? setModalShow(true) : null;
    }
    setActiveDay(arg.dateStr);

    console.log(formatted, formatted <= arg.dateStr, arg.dateStr);
    // alert(arg.dateStr);
  };

  console.log(
    todos.map((todo) => ({
      id: todo._id,
      title: todo.task,
      start: todo.date || todo.Fromtime,
      end: todo.Totime,
    }))
  );

  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={todos}
        eventDataTransform={(todo) => {
          return {
            id: todo.id,
            title: todo.task || "Untitled Todo",
            start: todo.date || todo.Fromtime, // ✅ must exist
            end: todo.Totime || null, // optional
          };
        }}
      />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        activeDay={activeDay}
      />
      ;
    </Container>
  );
}
